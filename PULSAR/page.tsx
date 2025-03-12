"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import GoalCard from "@/components/UiKit/Card/GoalCard";
import SalesPerformance from "@/components/UiKit/Card/SalesPerformace";

interface Member {
  id: number;
  name: string;
  sales: number;
}

interface Goal {
  id: number;
  name: string;
  totalValue: number;
  startDate: string;
  endDate: string;
  currentValue: number;
  contracts: number;
  proposals: number;
  members: Member[];
}

const mockGoals: Goal[] = [
  {
    id: 1,
    name: "Meta 1",
    totalValue: 10000,
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    currentValue: 5000,
    contracts: 5,
    proposals: 10,
    members: [
      { id: 1, name: "João Silva", sales: 5000 },
      { id: 2, name: "Maria Souza", sales: 3000 },
    ],
  },
  {
    id: 2,
    name: "Meta 2",
    totalValue: 15000,
    startDate: "2024-02-01",
    endDate: "2024-07-30",
    currentValue: 7000,
    contracts: 7,
    proposals: 12,
    members: [],
  },
  {
    id: 3,
    name: "Meta 3",
    totalValue: 20000,
    startDate: "2024-03-01",
    endDate: "2024-08-30",
    currentValue: 12000,
    contracts: 10,
    proposals: 15,
    members: [{ id: 3, name: "Carlos Lima", sales: 12000 }],
  },
];

// Lista de vendedores disponíveis
const availableSellers: Member[] = [
  { id: 4, name: "Ana Oliveira", sales: 0 },
  { id: 5, name: "Pedro Santos", sales: 0 },
  { id: 6, name: "Mariana Lima", sales: 0 },
];

const KPI = () => {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<number | "">("");
  const [individualGoal, setIndividualGoal] = useState("");
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [openAddMemberModal, setOpenAddMemberModal] = useState(false);
  const [openAddGoalModal, setOpenAddGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: "", totalValue: "", startDate: "", endDate: "" });

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.totalValue || !newGoal.startDate || !newGoal.endDate) return;

    const newGoalObject: Goal = {
      id: goals.length + 1,
      name: newGoal.name,
      totalValue: Number(newGoal.totalValue),
      startDate: newGoal.startDate,
      endDate: newGoal.endDate,
      currentValue: 0,
      contracts: 0,
      proposals: 0,
      members: [],
    };

    setGoals([...goals, newGoalObject]);
    setOpenAddGoalModal(false);
    setNewGoal({ name: "", totalValue: "", startDate: "", endDate: "" });
  };


  const handleAddMember = () => {
    if (!selectedGoal || selectedSeller === "" || individualGoal === "") return;

    const newSeller = availableSellers.find((seller) => seller.id === selectedSeller);
    if (!newSeller) return;

    const updatedGoal = {
      ...selectedGoal,
      members: [...selectedGoal.members, { ...newSeller, sales: Number(individualGoal) }],
    };

    setSelectedGoal(updatedGoal);
    setOpenModal(false);
    setSelectedSeller("");
    setIndividualGoal("");
  };

  return (
    <Box display="flex" gap={3}>
      {/* Lista de Metas */}
      <Card sx={{ boxShadow: "none", borderRadius: "7px", mb: "25px", p: 2 }}>
        <Box sx={{display: "flex", justifyContent: "flex-end", mb: 1, mt: 1}}>
        <Button variant="contained" color="primary" onClick={() => setOpenAddGoalModal(true)}>
            Adicionar meta
          </Button>
        </Box>

        {mockGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onSelect={() => setSelectedGoal(goal)} />
        ))}
      </Card>

      {/* Detalhes da Meta Selecionada */}
      <Card sx={{ flex: 1, p: 2, boxShadow: "none" }}>
        <Typography variant="h6" mb={2}>
          {selectedGoal ? `Membros de ${selectedGoal.name}` : "Selecione uma meta"}
        </Typography>
        {selectedGoal ? (
          selectedGoal.members.length > 0 ? (
            <SalesPerformance members={selectedGoal.members} />
          ) : (
            <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
              Adicionar Membro
            </Button>
          )
        ) : null}
      </Card>

      {/* Modal para adicionar membro */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Adicionar Membro</DialogTitle>
        <DialogContent>
          {/* Seletor de vendedor */}
          <Select
            fullWidth
            value={selectedSeller}
            onChange={(e) => setSelectedSeller(e.target.value as number)}
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>Selecione um vendedor</MenuItem>
            {availableSellers.map((seller) => (
              <MenuItem key={seller.id} value={seller.id}>{seller.name}</MenuItem>
            ))}
          </Select>

          {/* Input da meta individual */}
          <TextField
            fullWidth
            label="Meta Individual"
            type="number"
            value={individualGoal}
            onChange={(e) => setIndividualGoal(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button onClick={handleAddMember} variant="contained" color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
      {/* Modal para adicionar meta */}
      <Dialog open={openAddGoalModal} onClose={() => setOpenAddGoalModal(false)}>
        <DialogTitle>Adicionar Meta</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome da Meta"
            value={newGoal.name}
            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Valor Total"
            type="number"
            value={newGoal.totalValue}
            onChange={(e) => setNewGoal({ ...newGoal, totalValue: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Data de Início"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newGoal.startDate}
            onChange={(e) => setNewGoal({ ...newGoal, startDate: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Data de Término"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newGoal.endDate}
            onChange={(e) => setNewGoal({ ...newGoal, endDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddGoalModal(false)}>Cancelar</Button>
          <Button onClick={handleAddGoal} variant="contained" color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default KPI;
