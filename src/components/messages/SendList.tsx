import { PictureAsPdf } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
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
import useAppStore from "../../appStore";
import { tableHeader } from "../../entities/MessagesSend";
import useQueryStore from "../../hooks/queryStore";
import { useMessagesDelete, useMessagesSendbox } from "../../hooks/useMessages";
import { ExportExcel } from "../Export/ExportExcel";
import { ExportPDF } from "../Export/ExportPDF";
import { MessageDisplay } from "./MessageDisplay";
import { MessageReply } from "./MessageReply";
import { MessageSend } from "./MessageSend";

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

export default function SendList() {
  const { data } = useMessagesSendbox();

  const updatemessageCount = useAppStore((s: any) => s.updatemessageCount);
  useEffect(() => {
    if (data) {
      let messageCount = data.result.filter(
        (message: any) => message.readId === null
      );
      updatemessageCount(messageCount.length);
    }
  }, [data]);

  const { mutate: deleteMute } = useMessagesDelete();

  const setPage = useQueryStore((s) => s.setPage);
  const setPageSize = useQueryStore((s) => s.setPageSize);
  const page = useQueryStore((s) => s.page);
  const pageSize = useQueryStore((s) => s.pageSize);

  const [open, setOpen] = React.useState(false);
  const [editopen, setEditOpen] = React.useState(false);
  const [replyopen, setReplyOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  // const handleReplyOpen = () => setReplyOpen(true);
  const handleReplyClose = () => setReplyOpen(false);
  const [messageViewData, setMessageViewData] = React.useState("");

  const handleChangePage = (_event: unknown, newPage: number) =>
    setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value));
    setPage(0);
  };

  const deleteMessage = (row: any) => {
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
        deleteMute(row._id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          },
        });
      }
    });
  };

  const handleCellClick = (row: any) => {
    setMessageViewData(row);
    handleEditOpen();
    // if (!row.readId) {
    //   let data = {
    //     _id: row._id,
    //     data: {
    //       readId: readId,
    //     },
    //   };
    //   mutate(data, {
    //     onSuccess: () => {
    //       setMessageViewData(row);
    //       handleEditOpen();
    //     },
    //   });
    // } else {
    // }
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
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {" "}
            <MessageSend closeEvent={handleClose} />{" "}
          </Box>
        </Modal>

        <Modal
          open={editopen}
          onClose={handleEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <UserEdit closeEvent={handleEditClose} data={usereditData} /> */}
            <MessageDisplay
              closeEvent={handleEditClose}
              data={messageViewData}
              messageType="sendbox"
            />
          </Box>
        </Modal>

        <Modal
          open={replyopen}
          onClose={handleReplyClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <UserEdit closeEvent={handleEditClose} data={usereditData} /> */}
            <MessageReply
              closeEvent={handleReplyClose}
              data={messageViewData}
            />
          </Box>
        </Modal>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {/* <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Total Inbox Messages ({data?.count})
        </Typography>
        <Divider />*/}
        <Box height={10} />
        <Stack
          direction="row"
          spacing={2}
          style={{ margin: "0 20px 10px 20px" }}
          justifyContent="space-between"
        >
          {/* <AutocompleteCombo /> */}

          <Stack>
            <Button variant="contained" onClick={handleOpen}>
              Send New Message
            </Button>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography gutterBottom variant="h6" component="div">
              Total Send Messages ({data?.count})
            </Typography>
            <IconButton onClick={downloadPdf}>
              <PictureAsPdf />
            </IconButton>
            <IconButton onClick={downloadExcel}>
              <PrintIcon />
            </IconButton>
          </Stack>
        </Stack>
        <TableContainer sx={{ maxHeight: 500 }}>
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
                    let value = "";
                    if (header.key === "receiverId") {
                      if (row.receiverId.length > 0) {
                        let newR = row.receiverId.map(
                          (receiver: any) => receiver.email
                        );
                        value = newR.join(",");
                        // for (let i = 0; i < row.receiverId.length; i++)
                        //   value += row.receiverId[i].email + ",";
                      } else value = "";
                    } else value = row[header.key ? header.key : ""];
                    return (
                      <StyledTableCell
                        key={index}
                        align={header.align || "left"}
                        sx={{ color: "black", cursor: "pointer" }}
                        onClick={() => handleCellClick(row)}
                      >
                        {/* <Link
                          style={{ textDecoration: "none", color: colorCode }}
                          state={{ data: row }}
                          to={`/users/user/${row._id}`}
                        > */}
                        {header.formatSubStr && typeof value === "string"
                          ? header.formatSubStr(value)
                          : header.formatDate && typeof value === "string"
                          ? header.formatDate(value)
                          : value}
                        {/* </Link> */}
                      </StyledTableCell>
                    );
                  })}
                  <StyledTableCell sx={{ width: "100px" }} align="center">
                    <DeleteIcon
                      style={{
                        fontSize: "20px",
                        color: "red",
                        cursor: "pointer",
                      }}
                      className="cursor-pointer"
                      onClick={() => {
                        deleteMessage(row);
                      }}
                    />
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
      </Paper>
    </>
  );
}
