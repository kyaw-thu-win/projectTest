import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useAppStore from "../appStore";
import { tableHeader } from "../entities/Announcements";
import useQueryStore from "../hooks/queryStore";
import {
  useAnnouncementDelete,
  useAnnouncementDeletePut,
  useAnnouncements,
  useAnnouncementsRead,
} from "../hooks/useAnnouncement";
import { AnnouncementAdd } from "./AnnouncementAdd";
import { AnnouncementDisplay } from "./AnnouncementDisplay";
import { AnnouncementEdit } from "./AnnouncementEdit";
import { ExportExcel } from "./Export/ExportExcel";
import { ExportPDF } from "./Export/ExportPDF";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AnnouncementLists() {
  const { data } = useAnnouncements();
  const userId = useAppStore((s: any) => s.userId);

  const updateannouncementCount = useAppStore((s) => s.updateannouncementCount);
  useEffect(() => {
    if (data) {
      let announcementCount = data.result.filter(
        (announcement: any) => announcement.readId === null
      );
      updateannouncementCount(announcementCount.length);
    }
  }, [data]);

  const { mutate: delMute } = useAnnouncementDelete();

  const { mutate: delPutMute } = useAnnouncementDeletePut();

  const { mutate: ReadMutate } = useAnnouncementsRead();

  const setPage = useQueryStore((s) => s.setPage);
  const setPageSize = useQueryStore((s) => s.setPageSize);
  const page = useQueryStore((s) => s.page);
  const pageSize = useQueryStore((s) => s.pageSize);

  const [open, setOpen] = React.useState(false);
  const [editopen, setEditOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleViewOpen = () => setViewOpen(true);
  const handleViewClose = () => setViewOpen(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const [usereditData, setUsereditData] = React.useState("");
  const [announcementViewData, setAnnouncementViewData] = React.useState("");

  const handleChangePage = (_event: unknown, newPage: number) =>
    setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value));
    setPage(0);
  };

  const deleteAnnouncement = (row: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        if (row.creatorId.toString() === userId) {
          delMute(row._id);
        } else {
          let data = {
            _id: row._id,
            data: {
              deleteId: userId,
            },
          };
          delPutMute(data, {
            onSuccess: () => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            },
          });
        }
      }
    });
  };

  const editData = (data: string) => {
    setUsereditData(data);
    handleEditOpen();
  };

  const ViewData = (row: any) => {
    if (!row.readId) {
      let data = {
        _id: row._id,
      };
      ReadMutate(data, {
        onSuccess: () => {
          setAnnouncementViewData(row);
          handleViewOpen();
        },
      });
    } else {
      setAnnouncementViewData(row);
      handleViewOpen();
    }
  };

  const downloadExcel = async () => {
    ExportExcel({
      heading: "Export Document",
      // headerColumn: headerColumn,
      headerColumn: tableHeader,
      data: data.result,
      fileName: "exportExcel",
    });
  };

  const downloadPdf = () => {
    ExportPDF({
      heading: "Export Document",
      // headerColumn: headerColumn,
      headerColumn: tableHeader,
      data: data.result,
      fileName: "exportPDF",
    });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AnnouncementAdd closeEvent={handleClose} />
        </Box>
      </Modal>

      <Modal
        open={viewOpen}
        onClose={handleViewClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <UserEdit closeEvent={handleEditClose} data={usereditData} /> */}
          <AnnouncementDisplay
            closeEvent={handleViewClose}
            data={announcementViewData}
          />
        </Box>
      </Modal>

      <Modal
        open={editopen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AnnouncementEdit closeEvent={handleEditClose} data={usereditData} />
        </Box>
      </Modal>

      {/* <Paper sx={{ width: "100%", overflow: "hidden" }}> */}
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ padding: "20px" }}
      >
        Announcement Lists ({data?.count})
      </Typography>
      <Divider />
      <Box height={10} />
      <Stack direction="row" spacing={2} style={{ margin: "0 20px 10px 20px" }}>
        {/* <AutocompleteCombo /> */}

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>

        <Button variant="contained" color="primary" onClick={downloadPdf}>
          Print PDF
        </Button>
        <Button variant="contained" color="primary" onClick={downloadExcel}>
          Print Excel
        </Button>
        <Button
          variant="contained"
          endIcon={<AddCircleIcon />}
          onClick={handleOpen}
        >
          Add
        </Button>
      </Stack>
      <TableContainer sx={{ maxHeight: 750, paddingX: "20px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableHeader.map((column) => (
                <StyledTableCell
                  key={column.key}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.header}
                </StyledTableCell>
              ))}

              <StyledTableCell key="edit">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.result.map((row: any, index: any) => (
              <StyledTableRow
                key={row.id | row._id | index}
                hover
                role="checkbox"
                tabIndex={-1}
              >
                {tableHeader.map((header, index) => {
                  let colorCode;
                  if (row.readId === null) colorCode = "red";
                  else colorCode = "black";
                  const value = row[header.key ? header.key : ""];
                  return (
                    <StyledTableCell
                      key={index}
                      align={header.align || "left"}
                      sx={{ color: colorCode, cursor: "pointer" }}
                      onClick={() => ViewData(row)}
                    >
                      {/* <Link
                          style={{ textDecoration: "none" }}
                          state={{ data: row }}
                          to={`/users/user/${row._id}`}
                        > */}
                      {header.formatSubStr && typeof value === "string"
                        ? header.formatSubStr(value)
                        : header.formatArr && Array.isArray(value)
                        ? header.formatArr(value)
                        : header.formatDate && typeof value === "string"
                        ? header.formatDate(value)
                        : value}
                      {/* </Link> */}
                    </StyledTableCell>
                  );
                })}
                <StyledTableCell sx={{ width: "100px" }} align="center">
                  <Stack direction="row" justifyContent="space-between">
                    <EditIcon
                      style={{
                        fontSize: "20px",
                        color: "blue",
                        cursor: "pointer",
                      }}
                      className="cursor-pointer"
                      onClick={() => {
                        editData(row);
                      }}
                    />
                    <DeleteIcon
                      style={{
                        fontSize: "20px",
                        color: "red",
                        cursor: "pointer",
                      }}
                      className="cursor-pointer"
                      onClick={() => {
                        deleteAnnouncement(row);
                      }}
                    />
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={data?.count > 0 ? data.count : 1000}
        rowsPerPage={pageSize || 10}
        page={page || 0}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* </Paper> */}
    </Paper>
  );
}
