import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { User, tableHeader } from "../entities/Users";
import { useUsers, useUsersDelete } from "../hooks/useUser";
import AutocompleteCombo from "./AutoCompleteCombo";
import { ExportExcel } from "./Export/ExportExcel";
import { ExportPDF } from "./Export/ExportPDF";
import { UserAdd } from "./UserAdd";
import { UserEdit } from "./UserEdit";
import { Modalstyle, StyledTableCell, StyledTableRow } from "./themes/styles";
import { PictureAsPdf } from "@mui/icons-material";
import PrintIcon from "@mui/icons-material/Print";
import { Loading } from "./themes/Loading";

export default function UserLists() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [roles, setRoles] = useState(["User"]);
  const { data, isLoading } = useUsers(page, pageSize, roles);

  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const { mutate } = useUsersDelete();
  const [usereditData, setUsereditData] = useState<User>({
    _id: "",
  });

  const handleChangePage = (_event: unknown, newPage: number) =>
    setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value));
    setPage(0);
  };

  const handleRoles = (role: string[]) => {
    setPage(0);
    if (role.length > 0) {
      setRoles(role);
    } else {
      setRoles(["User"]);
    }
  };

  const deleteUser = (id: string | undefined, index: string | number) => {
    if (id !== undefined) {
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
    }
  };

  const editData = (data: User) => {
    if (data !== undefined) {
      setUsereditData(data);
      handleEditOpen();
    }
  };

  const downloadExcel = async () => {
    ExportExcel({
      heading: "Export Document",
      headerColumn: tableHeader,
      data: data?.result,
      fileName: "exportExcel",
    });
  };

  const downloadPdf = () => {
    ExportPDF({
      heading: "Export Document",
      headerColumn: tableHeader,
      data: data?.result,
      fileName: "exportPDF",
    });
  };

  return (
    <Paper sx={{ width: "100%", height: "88vh", overflow: "hidden" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Modalstyle}>
          <UserAdd closeEvent={handleClose} />
        </Box>
      </Modal>

      <Modal
        open={editopen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Modalstyle}>
          <UserEdit closeEvent={handleEditClose} data={usereditData} />
        </Box>
      </Modal>
      <Divider />
      <Box height={10} />
      <Stack
        direction="row"
        style={{ margin: "0 20px 10px 20px" }}
        justifyContent="space-between"
      >
        <Button
          variant="contained"
          endIcon={<AddCircleIcon />}
          onClick={handleOpen}
        >
          New User
        </Button>

        <Typography gutterBottom variant="h5" component="div">
          Users List ({data?.count})
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          style={{ margin: "0 20px 10px 20px" }}
        >
          <AutocompleteCombo roleEvent={handleRoles} />

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <IconButton onClick={downloadPdf}>
            <PictureAsPdf />
          </IconButton>
          <IconButton onClick={downloadExcel}>
            <PrintIcon />
          </IconButton>
        </Stack>
      </Stack>

      {isLoading ? (
        <Loading />
      ) : (
        <>
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

                  <StyledTableCell key="edit"></StyledTableCell>
                  <StyledTableCell key="delete"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.result?.map((row: User, index) =>
                  row._id ? (
                    <StyledTableRow
                      key={index}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      {tableHeader.map((header, index) => {
                        const value = row[header.key ? header.key : ""] || "";
                        return (
                          <StyledTableCell
                            key={index}
                            align={header.align || "left"}
                          >
                            {header.formatBol && typeof value === "boolean"
                              ? header.formatBol(value)
                              : header.formatArr && Array.isArray(value)
                              ? header.formatArr(value)
                              : header.formatDate && typeof value === "string"
                              ? header.formatDate(value)
                              : value}
                          </StyledTableCell>
                        );
                      })}
                      <StyledTableCell align="center">
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
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <DeleteIcon
                          style={{
                            fontSize: "20px",
                            color: "red",
                            cursor: "pointer",
                          }}
                          className="cursor-pointer"
                          onClick={() => {
                            {
                              deleteUser(row._id, index);
                            }
                          }}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : null
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={data?.count ? data.count : 1000}
            rowsPerPage={pageSize || 10}
            page={page || 0}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
}
