import { useState, useEffect, useMemo } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Switch,
  TextField,
  MenuItem,
  Modal,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
  Chip,
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';

import {
  fetchUsers,
  createUser,
  updateUser,
} from '../../services/UserService';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '24px',
  boxShadow: 24,
  p: 4,
};

const UsersPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [errors, setErrors] = useState({});

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    address: '',
    type: 'Editor',
    isActive: true,
  });

  const cardStyle = {
    borderRadius: '28px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)',
    backgroundColor: '#ffffff',
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchUsers();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();

      const matchesSearch =
        fullName.includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.username?.toLowerCase().includes(search.toLowerCase()) ||
        user.contactNumber?.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === 'all' || user.type === typeFilter;

      const matchesGender =
        genderFilter === 'all' || user.gender === genderFilter;

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && user.isActive) ||
        (statusFilter === 'disabled' && !user.isActive);

      return matchesSearch && matchesType && matchesGender && matchesStatus;
    });
  }, [users, search, typeFilter, genderFilter, statusFilter]);

  const handleOpen = () => {
    setIsEditing(false);
    setErrors({});
    setNewUser({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      contactNumber: '',
      email: '',
      username: '',
      password: '',
      address: '',
      type: 'editor',
      isActive: true,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditUserId(null);
    setErrors({});
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user._id === id);

    if (userToEdit) {
      setErrors({});
      setNewUser({ ...userToEdit, password: '' });
      setEditUserId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleSaveUser = async () => {
    const validationErrors = {};

    const passwordRegex =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    if (!isEditing || newUser.password) {
      if (!passwordRegex.test(newUser.password)) {
        validationErrors.password =
          'Password must be at least 8 characters and contain a special symbol.';
      }
    }

    if (!/^\d{11}$/.test(newUser.contactNumber)) {
      validationErrors.contactNumber =
        'Mobile number must be exactly 11 digits.';
    }

    if (Number(newUser.age) < 0) {
      validationErrors.age = 'Age must not be negative.';
    }

    if (!newUser.email.includes('@')) {
      validationErrors.email = 'Email must contain @ symbol.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isEditing) {
        const updatedUser = { ...newUser };

        if (!updatedUser.password) {
          delete updatedUser.password;
        }

        await updateUser(editUserId, updatedUser);
        showAlert('User updated successfully.', 'success');
      } else {
        await createUser(newUser);
        showAlert('User added successfully.', 'success');
      }

      setErrors({});
      loadUsers();
      handleClose();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await updateUser(id, { isActive: !isActive });

      if (isActive) {
        showAlert('User has been disabled successfully.', 'error');
      } else {
        showAlert('User has been enabled successfully.', 'success');
      }

      loadUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      valueGetter: (value, row) =>
        `${row.firstName || ''} ${row.lastName || ''}`,
    },
    { field: 'age', headerName: 'Age', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
  field: 'type',
  headerName: 'Type',
  flex: 1,
  renderCell: (params) => {
    const type = params.row.type || '';

    return (
      type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
    );
  },
},
    { field: 'contactNumber', headerName: 'Contact', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    {
  field: 'status',
  headerName: 'Status',
  width: 90,
      renderCell: (params) => (
        <Chip
          label={params.row.isActive ? 'Active' : 'Disabled'}
          color={params.row.isActive ? 'success' : 'error'}
          size="small"
        />
      ),
    },
    {
  field: 'actions',
  headerName: 'Actions',
  width: 330,
  sortable: false,

  renderCell: (params) => (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        width: '100%',
        height: '100%',
        pt: 1,
        px: 1,
      }}
    >
      <Stack direction="row" spacing={1}>
        <Button
          size="small"
          startIcon={<EditIcon />}
          onClick={() => handleEdit(params.row._id)}
          sx={{
            width: 100,
            height: 38,
            bgcolor: '#0f172a',
            color: '#ffffff',
            fontWeight: 800,
            borderRadius: '14px',
            textTransform: 'none',
            boxShadow:
              '0 8px 18px rgba(15, 23, 42, 0.18)',

            '&:hover': {
              bgcolor: '#1e293b',
            },
          }}
        >
          Edit
        </Button>

        <Button
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete(params.row._id)}
          sx={{
  width: 105,
  height: 38,
  bgcolor: '#ffffff',
  color: '#dc2626',
  fontWeight: 800,
  borderRadius: '14px',
  textTransform: 'none',
  border: '1.5px solid #fecaca',
  boxShadow:
    '0 8px 18px rgba(15, 23, 42, 0.08)',

  '& .MuiSvgIcon-root': {
    color: '#dc2626',
  },

  '&:hover': {
    bgcolor: '#fef2f2',
    borderColor: '#fca5a5',
  },
}}
        >
          Delete
        </Button>
      </Stack>

      <Switch
        checked={params.row.isActive}
        onChange={() =>
          handleToggleActive(
            params.row._id,
            params.row.isActive
          )
        }
        color="success"
      />
    </Stack>
  ),
},
];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: { xs: 2, md: 4 },
        background:
          'linear-gradient(180deg, #eef2ff 0%, #f8fafc 40%, #ffffff 100%)',
      }}
    >
      <Stack spacing={4}>
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: '32px',
            color: '#fff',
            background:
              'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.28)',
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            spacing={3}
          >
            <Box>
              <Typography
                sx={{
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  fontSize: 12,
                  opacity: 0.75,
                  fontWeight: 700,
                }}
              >
                User Management
              </Typography>

              <Typography variant="h3" sx={{ fontWeight: 900 }}>
                Users
              </Typography>

              <Typography
                sx={{
                  mt: 1.5,
                  maxWidth: 650,
                  color: '#cbd5e1',
                  mr: { xs: 0, md: 40 },
                }}
              >
                Manage user records, account details, roles, and active status.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={handleOpen}
              sx={{
                bgcolor: '#ffffff',
                color: '#0f172a',
                fontWeight: 700,
                borderRadius: '14px',
                px: 3,
                '&:hover': { bgcolor: '#e2e8f0' },
              }}
            >
              Add User
            </Button>
          </Stack>
        </Box>

        <Card sx={cardStyle}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              User Records
            </Typography>

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              sx={{ mb: 3 }}
            >
              <TextField
                label="Search users"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
              />

              <TextField
                select
                label="Type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                sx={{ minWidth: 160 }}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Editor">Editor</MenuItem>
                <MenuItem value="Viewer">Viewer</MenuItem>
              </TextField>

              <TextField
                select
                label="Gender"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                sx={{ minWidth: 160 }}
              >
                <MenuItem value="all">All Genders</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>

              <TextField
                select
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ minWidth: 160 }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="disabled">Disabled</MenuItem>
              </TextField>
            </Stack>

            <Box sx={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={filteredUsers}
                columns={columns}
                getRowId={(row) => row._id}
                loading={loading}
                pageSizeOptions={[10, 20, 50]}
                disableRowSelectionOnClick
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10 },
                  },
                }}
                sx={{
                  border: 0,
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    fontWeight: 800,
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            {isEditing ? 'Edit User' : 'Add User'}
          </Typography>

          <Stack direction="column" spacing={3}>
            <FormControl fullWidth variant="standard">
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label="Enter first name"
                  variant="standard"
                  value={newUser.firstName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, firstName: e.target.value })
                  }
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label="Enter last name"
                  variant="standard"
                  value={newUser.lastName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, lastName: e.target.value })
                  }
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label="Enter age"
                  variant="standard"
                  type="number"
                  value={newUser.age}
                  error={!!errors.age}
                  helperText={errors.age}
                  onChange={(e) =>
                    setNewUser({ ...newUser, age: e.target.value })
                  }
                />
              </Box>

              <Stack direction="row" sx={{ alignItems: 'flex-end', mb: 2 }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <FormControl fullWidth variant="standard">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    IconComponent={ExpandMoreIcon}
                    value={newUser.gender}
                    onChange={(e) =>
                      setNewUser({ ...newUser, gender: e.target.value })
                    }
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label="Enter mobile"
                  variant="standard"
                  value={newUser.contactNumber}
                  error={!!errors.contactNumber}
                  helperText={errors.contactNumber}
                  onChange={(e) =>
                    setNewUser({ ...newUser, contactNumber: e.target.value })
                  }
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label="Enter address"
                  variant="standard"
                  value={newUser.address}
                  onChange={(e) =>
                    setNewUser({ ...newUser, address: e.target.value })
                  }
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label="Enter email"
                  variant="standard"
                  value={newUser.email}
                  error={!!errors.email}
                  helperText={errors.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </Box>

              <Stack direction="row" sx={{ alignItems: 'flex-end', mb: 2 }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <FormControl fullWidth variant="standard">
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={newUser.type || 'viewer'}
                    onChange={(e) =>
                      setNewUser({ ...newUser, type: e.target.value })
                    }
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Editor">Editor</MenuItem>
                    <MenuItem value="Viewer">Viewer</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label="Enter username"
                  variant="standard"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label="Enter password"
                  variant="standard"
                  type="password"
                  value={newUser.password}
                  error={!!errors.password}
                  helperText={errors.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </Box>
            </FormControl>

            <Stack spacing={2} direction="row">
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>

              <Button variant="contained" onClick={handleSaveUser}>
                {isEditing ? 'Save Changes' : 'Add'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UsersPage;