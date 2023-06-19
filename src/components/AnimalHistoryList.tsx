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
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { tableHeader } from "../entities/AnimalHistorysAbstract";
import useQueryStore from "../hooks/queryStore";
import {
  useAnimalHistorys,
  useAnimalHistorysDelete,
} from "../hooks/useAnimalHistory";
import { AnimalHistoryAdd } from "./AnimalHistoryAdd";
import { AnimalHistoryEdit } from "./AnimalHistoryEdit";

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

export default function AnimalHistoryList({ animalId }: any) {
  // if (!ownerId) return;
  // const { data, error, isLoading } = useUsers();
  const navigate = useNavigate();

  const { data, isLoading } = useAnimalHistorys();

  const { mutate } = useAnimalHistorysDelete();
  const setPage = useQueryStore((s) => s.setPage);
  const setPageSize = useQueryStore((s) => s.setPageSize);
  const page = useQueryStore((s) => s.page);
  const pageSize = useQueryStore((s) => s.pageSize);

  const [open, setOpen] = React.useState(false);
  const [editopen, setEditOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const [animaleditData, setAnimaleditData] = React.useState("");

  const handleChangePage = (_event: unknown, newPage: number) =>
    setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value));
    setPage(0);
  };

  useEffect(() => {
    setPage(0);
    setPageSize(10);
  }, []);

  const deleteAnimalHistory = (id: any, index: any) => {
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
        mutate(id, {
          onSuccess: () => {
            if (index === 0) setPage(page && page > 0 ? page - 1 : 0);
          },
        });
      }
    });
  };

  const editData = (data: any) => {
    data.animalId = animalId;
    setAnimaleditData(data);
    handleEditOpen();
  };

  const downloadExcel = async () => {
    // ExportExcel({
    //   heading: "Export Document",
    //   // headerColumn: headerColumn,
    //   headerColumn: tableHeader,
    //   data: data.result,
    //   fileName: "exportExcel",
    // });
  };

  const downloadPdf = () => {
    // ExportPDF({
    //   heading: "Export Document",
    //   // headerColumn: headerColumn,
    //   headerColumn: tableHeader,
    //   data: data.result,
    //   fileName: "exportPDF",
    // });
  };

  if (isLoading) return <Typography>Loading ...........</Typography>;
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AnimalHistoryAdd animalId={animalId} closeEvent={handleClose} />
          </Box>
        </Modal>

        <Modal
          open={editopen}
          onClose={handleEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AnimalHistoryEdit
              closeEvent={handleEditClose}
              data={animaleditData}
            />
          </Box>
        </Modal>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Stack direction="row" spacing={3} padding={3}>
          <Button
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={() => navigate("/newRegister")}
          >
            Add New Register
          </Button>

          <Button
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={() => navigate("/newRegisterbyowner")}
          >
            Add New Register By Owner
          </Button>

          <Button
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={() => navigate("/newRegisterbyid")}
          >
            Add New Register By ID
          </Button>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ padding: "20px" }}
          >
            Need to be Return Animal ({data?.count})
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            style={{ margin: "0 20px 10px 20px" }}
            height="50px"
          >
            <Button variant="contained" color="primary" onClick={downloadPdf}>
              Print PDF
            </Button>
            <Button variant="contained" color="primary" onClick={downloadExcel}>
              Print Excel
            </Button>
          </Stack>
        </Stack>
        <Divider />
        <Box height={10} />
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
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
              {data?.result?.map((row: any, index: any) => (
                <StyledTableRow
                  key={row.id | row._id | index}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                >
                  <StyledTableCell>{++index}</StyledTableCell>
                  {tableHeader.map((header, index) => {
                    if (header.key === "userId") {
                      return (
                        <StyledTableCell
                          key={index}
                          align={header.align || "left"}
                        >
                          {row.animalId && row.animalId.ownerId
                            ? row.animalId.ownerId.name
                            : ""}
                        </StyledTableCell>
                      );
                    }
                    if (header.key === "animalId") {
                      return (
                        <StyledTableCell
                          key={index}
                          align={header.align || "left"}
                        >
                          {row.animalId && row.animalId.name}
                        </StyledTableCell>
                      );
                    }
                    const value = row[header.key ? header.key : ""];
                    return (
                      <StyledTableCell
                        key={index}
                        align={header.align || "left"}
                      >
                        {/* <Link
                          style={{ textDecoration: "none" }}
                          state={{ data: row }}
                          to={`/animals/${row._id}`}
                        > */}
                        {header.formatBol && typeof value === "boolean"
                          ? header.formatBol(value)
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
                          deleteAnimalHistory(row._id, index);
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
          count={data?.count && data?.count > 0 ? data.count : 1}
          rowsPerPage={pageSize || 10}
          page={page || 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
