"use client";

import React, { useState, MouseEvent } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  LinearProgress,
  Menu,
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";

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

interface GoalCardProps {
  goal: Goal;
  onSelect: (goal: Goal) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [modalType, setModalType] = useState<string | null>(null);
  const [goalName, setGoalName] = useState(goal.name);
  const [goalValue, setGoalValue] = useState(goal.totalValue);
  const [goalStart, setGoalStart] = useState(goal.startDate);
  const [goalEnd, setGoalEnd] = useState(goal.endDate);

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (type: string) => {
    setModalType(type);
    handleClose();
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const progress = (goal.currentValue / goal.totalValue) * 100;

  return (
    <>
      <Card
        sx={{ maxWidth: 345, mb: "25px", boxShadow: "0 4px 45px #0000001a", cursor: "pointer" }}
        onClick={() => onSelect(goal)}
      >
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: "primary.main" }}>G</Avatar>}
          action={
            <>
              <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => handleOpenModal("edit")}>Editar</MenuItem>
                <MenuItem onClick={() => handleOpenModal("delete")}>Excluir</MenuItem>
              </Menu>
            </>
          }
          title={goalName}
          subheader={`Período: ${goalStart} - ${goalEnd}`}
        />

        <CardContent>
          <Typography variant="h6">Valor: R$ {goal.totalValue.toLocaleString("pt-BR")}</Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ mt: 1, mb: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Progresso: {progress.toFixed(2)}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Valor atingido: R$ {goal.currentValue.toLocaleString("pt-BR")}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="body2">Contratos: {goal.contracts}</Typography>
            <Typography variant="body2">Propostas: {goal.proposals}</Typography>
          </Box>
        </CardContent>
        <CardActions disableSpacing />
      </Card>

      {/* Modal de Edição e Exclusão */}
      <Dialog open={Boolean(modalType)} onClose={handleCloseModal}>
        <DialogTitle>
          {modalType === "edit" && "Editar Meta"}
          {modalType === "delete" && "Excluir Meta"}
        </DialogTitle>
        <DialogContent  >
          {modalType === "edit" && (
            <Box component="form" sx={{display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
              <TextField
                label="Nome da Meta"
                fullWidth
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
              />
              <TextField
                label="Valor da Meta"
                fullWidth
                type="number"
                value={goalValue}
                onChange={(e) => setGoalValue(Number(e.target.value))}
              />
              <TextField
                label="Início do Período"
                fullWidth
                type="date"
                value={goalStart}
                onChange={(e) => setGoalStart(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Fim do Período"
                fullWidth
                type="date"
                value={goalEnd}
                onChange={(e) => setGoalEnd(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          )}
          {modalType === "delete" && <Typography>Tem certeza que deseja excluir esta meta?</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          {modalType === "delete" && <Button color="error" onClick={handleCloseModal}>Excluir</Button>}
          {modalType === "edit" && <Button color="primary" onClick={handleCloseModal}>Salvar</Button>}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GoalCard;