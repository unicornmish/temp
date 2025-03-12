"use client";

import * as React from "react";
import Image from "next/image";
import {
  Card,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  TableHead,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  TextField,
  DialogActions,

} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Seller {
  id: string;
  sellerImage: string;
  sellerName: string;
  goal: number;
  achieved: number;
  contracts: number;
  proposals: number;
}

const createData = (
  id: string,
  sellerImage: string,
  sellerName: string,
  goal: number,
  achieved: number,
  contracts: number,
  proposals: number
): Seller => ({ id, sellerImage, sellerName, goal, achieved, contracts, proposals });

const availableSellers = [
    { id: "#106", sellerImage: "/images/users/user6.jpg", sellerName: "Carlos Mendes" },
    { id: "#107", sellerImage: "/images/users/user7.jpg", sellerName: "Fernanda Lima" },
  ];

const rows: Seller[] = [
  createData("#101", "/images/users/user1.jpg", "Lucas Silva", 100000, 75000, 30, 50),
  createData("#102", "/images/users/user2.jpg", "Mariana Costa", 120000, 90000, 25, 45),
  createData("#103", "/images/users/user3.jpg", "Pedro Alves", 150000, 60000, 20, 40),
  createData("#104", "/images/users/user4.jpg", "Ana Souza", 110000, 95000, 35, 55),
  createData("#105", "/images/users/user5.jpg", "João Ferreira", 90000, 85000, 40, 60),
];

const SalesPerformance: React.FC = () => {
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const [selectedSeller, setSelectedSeller] = React.useState<Seller | null>(null);
  const [openAdd, setOpenAdd] = React.useState<boolean>(false);
  const [newSeller, setNewSeller] = React.useState<string>("");
  const [newGoal, setNewGoal] = React.useState<number>(0);
  const [editGoal, setEditGoal] = React.useState<number>(0);

  const handleEditOpen = (seller: Seller) => {
    setSelectedSeller(seller);
    setOpenEdit(true);
  };

  const handleDeleteOpen = (seller: Seller) => {
    setSelectedSeller(seller);
    setOpenDelete(true);
  };

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddSeller = () => {
    const sellerToAdd = availableSellers.find(seller => seller.id === newSeller);
    if (sellerToAdd) {
      setOpenAdd(false);
      setNewSeller("");
      setNewGoal(0);
    }
  };

  const handleEditSeller = () => {
    if (selectedSeller) {
      setOpenEdit(false);
      setSelectedSeller(null);
    }
  };

  const handleDeleteSeller = () => {
    if (selectedSeller) {
      setOpenDelete(false);
      setSelectedSeller(null);
    }
  };

  return (
    <>
    <Button variant="contained"  onClick={() => setOpenAdd(true)}>Adicionar Vendedor</Button>
    <Card sx={{ padding: "20px", boxShadow: "none", borderRadius: "7px" }}>
      <Typography variant="h5" fontWeight={700} mb={2}>Desempenho dos Vendedores</Typography>
      
      <TableContainer sx={{ boxShadow: "0 4px 45px #0000001a" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Vendedor</TableCell>
              <TableCell>Meta Individual</TableCell>
              <TableCell>Atingido</TableCell>
              <TableCell>Contratos</TableCell>
              <TableCell>Propostas</TableCell>
              <TableCell>Progresso</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Image src={row.sellerImage} alt="Vendedor" width={40} height={40} style={{ borderRadius: "50%" }} />
                    {row.sellerName}
                  </Box>
                </TableCell>
                <TableCell>{row.goal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
                <TableCell>{row.achieved.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
                <TableCell>{row.contracts}</TableCell>
                <TableCell>{row.proposals}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      background: `conic-gradient(#605DFF 0% ${(row.achieved / row.goal) * 100}%, #f1f1f1 ${(row.achieved / row.goal) * 100}%)`,
                      position: "relative",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        width: "80%",
                        height: "80%",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography fontSize={10} color="primary.main">
                        {Math.round((row.achieved / row.goal) * 100)}%
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton color="primary"  onClick={() => { setSelectedSeller(row); setEditGoal(row.goal); setOpenEdit(true); }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => { setSelectedSeller(row); setOpenDelete(true); }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Card>
    <Card sx={{ boxShadow: "none", borderRadius: "7px" }}>
    <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Adicionar Vendedor</DialogTitle>
        <DialogContent>
          <Select fullWidth value={newSeller} onChange={(e) => setNewSeller(e.target.value)}>
            {availableSellers.map(seller => (
              <MenuItem key={seller.id} value={seller.id}>{seller.sellerName}</MenuItem>
            ))}
          </Select>
          <TextField fullWidth label="Meta" type="number" value={newGoal} onChange={(e) => setNewGoal(Number(e.target.value))} sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancelar</Button>
          <Button onClick={handleAddSeller}>Adicionar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Editar Meta</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Meta" type="number" value={editGoal} onChange={(e) => setEditGoal(Number(e.target.value))} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancelar</Button>
          <Button onClick={handleEditSeller}>Salvar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Excluir Vendedor?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancelar</Button>
          <Button color="error" onClick={handleDeleteSeller}>Excluir</Button>
        </DialogActions>
      </Dialog>
      </Card>
    </>

  );
};

export default SalesPerformance;
