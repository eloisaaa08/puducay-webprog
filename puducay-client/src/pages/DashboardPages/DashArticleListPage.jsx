import { useEffect, useMemo, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';

import { DataGrid } from '@mui/x-data-grid';

const API_URL = 'http://localhost:8000/api/articles';

const emptyForm = {
  name: '',
  title: '',
  summary: '',
  author: '',
  date: '',
  readTime: '',
  image: '',
  content: '',
};

const DashArticleListPage = () => {
  const [rows, setRows] = useState([]);
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editData, setEditData] = useState(emptyForm);

  const [search, setSearch] = useState('');
  const [authorFilter, setAuthorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const fetchArticles = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      setArticles(data);

      const articleRows = data.map((article) => ({
        id: article._id,
        name: article.name,
        title: article.title,
        summary: article.summary,
        author: article.author,
        date: article.date,
        readTime: article.readTime,
        image: article.image,
        content: article.content || [],
        isActive: article.isActive !== false,
      }));

      setRows(articleRows);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const authors = [...new Set(rows.map((row) => row.author).filter(Boolean))];

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch =
        row.title?.toLowerCase().includes(search.toLowerCase()) ||
        row.author?.toLowerCase().includes(search.toLowerCase()) ||
        row.date?.toLowerCase().includes(search.toLowerCase()) ||
        row.readTime?.toLowerCase().includes(search.toLowerCase());

      const matchesAuthor =
        authorFilter === 'all' || row.author === authorFilter;

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && row.isActive) ||
        (statusFilter === 'disabled' && !row.isActive);

      return matchesSearch && matchesAuthor && matchesStatus;
    });
  }, [rows, search, authorFilter, statusFilter]);

  const handleOpenAdd = () => {
    setSelectedArticle(null);
    setEditData(emptyForm);
    setOpen(true);
  };

  const handleEdit = (row) => {
    const fullArticle = articles.find((article) => article._id === row.id);

    setSelectedArticle(row);

    setEditData({
      name: fullArticle?.name || '',
      title: fullArticle?.title || '',
      summary: fullArticle?.summary || '',
      author: fullArticle?.author || '',
      date: fullArticle?.date || '',
      readTime: fullArticle?.readTime || '',
      image: fullArticle?.image || '',
      content: Array.isArray(fullArticle?.content)
        ? fullArticle.content.join('\n')
        : '',
    });

    setOpen(true);
  };

  const handleSave = async () => {
    const articleData = {
      ...editData,
      content: editData.content
        .split('\n')
        .filter((paragraph) => paragraph.trim() !== ''),
    };

    if (selectedArticle) {
      await fetch(`${API_URL}/${selectedArticle.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      showAlert('Article updated successfully.', 'success');
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...articleData,
          isActive: true,
        }),
      });

      showAlert('Article added successfully.', 'success');
    }

    setOpen(false);
    setSelectedArticle(null);
    setEditData(emptyForm);
    fetchArticles();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    showAlert('Article deleted successfully.', 'error');
    fetchArticles();
  };

  const handleDisable = async (id, isActive) => {
    await fetch(`${API_URL}/${id}/status`, {
      method: 'PATCH',
    });

    if (isActive) {
      showAlert('Article has been disabled successfully.', 'error');
    } else {
      showAlert('Article has been enabled successfully.', 'success');
    }

    fetchArticles();
  };

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 120,
      sortable: false,
      renderCell: (params) =>
        params.row.image ? (
          <img
            src={params.row.image}
            alt="article"
            style={{
              width: '80px',
              height: '50px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginTop: '6px',
            }}
          />
        ) : (
          <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>
            No image
          </Typography>
        ),
    },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'author', headerName: 'Author', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'readTime', headerName: 'Read Time', flex: 1 },
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
      width: 340,
      sortable: false,
      renderCell: (params) => (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            width: '100%',
            height: '100%',
            px: 1,
            pt: 1,
          }}
        >
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              startIcon={<EditIcon />}
              onClick={() => handleEdit(params.row)}
              sx={{
                width: 100,
                height: 38,
                bgcolor: '#0f172a',
                color: '#ffffff',
                fontWeight: 800,
                borderRadius: '14px',
                textTransform: 'none',
                boxShadow: '0 8px 18px rgba(15, 23, 42, 0.18)',
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
              onClick={() => handleDelete(params.row.id)}
              sx={{
                width: 105,
                height: 38,
                bgcolor: '#ffffff',
                color: '#dc2626',
                fontWeight: 800,
                borderRadius: '14px',
                textTransform: 'none',
                border: '1.5px solid #fecaca',
                boxShadow: '0 8px 18px rgba(15, 23, 42, 0.08)',
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
              handleDisable(params.row.id, params.row.isActive)
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
            position: 'relative',
            overflow: 'hidden',
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
                Article Dashboard
              </Typography>

              <Typography variant="h3" sx={{ fontWeight: 900 }}>
                Articles
              </Typography>

              <Typography
                sx={{
                  mt: 1.5,
                  maxWidth: 650,
                  color: '#cbd5e1',
                  mr: { xs: 0, md: 40 },
                }}
              >
                Manage articles, edit content, update records, and control article visibility.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={handleOpenAdd}
              sx={{
                bgcolor: '#ffffff',
                color: '#0f172a',
                fontWeight: 700,
                borderRadius: '14px',
                px: 3,
                '&:hover': {
                  bgcolor: '#e2e8f0',
                },
              }}
            >
              Add Article
            </Button>
          </Stack>
        </Box>

        <Card
          sx={{
            borderRadius: '28px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)',
            backgroundColor: '#ffffff',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              Article Records
            </Typography>

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              sx={{ mb: 3 }}
            >
              <TextField
                label="Search articles"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
              />

              <TextField
                select
                label="Filter by Author"
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
                sx={{ minWidth: 220 }}
              >
                <MenuItem value="all">All Authors</MenuItem>
                {authors.map((author) => (
                  <MenuItem key={author} value={author}>
                    {author}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Filter by Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ minWidth: 180 }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="disabled">Disabled</MenuItem>
              </TextField>
            </Stack>

            <Box sx={{ height: 550 }}>
              <DataGrid
                rows={filteredRows}
                columns={columns}
                rowHeight={70}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                sx={{
                  border: 0,
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    fontWeight: 800,
                  },
                  '& .MuiDataGrid-cell': {
                    borderColor: '#f1f5f9',
                  },
                  '& .MuiDataGrid-footerContainer': {
                    borderTop: '1px solid #e2e8f0',
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>
          {selectedArticle ? 'Edit Article' : 'Add Article'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Article Slug / Name"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              fullWidth
            />

            <TextField
              label="Title"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              fullWidth
            />

            <TextField
              label="Summary"
              value={editData.summary}
              onChange={(e) =>
                setEditData({ ...editData, summary: e.target.value })
              }
              fullWidth
              multiline
              minRows={2}
            />

            <TextField
              label="Author"
              value={editData.author}
              onChange={(e) =>
                setEditData({ ...editData, author: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="Date"
              value={editData.date}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
              fullWidth
            />

            <TextField
              label="Read Time"
              value={editData.readTime}
              onChange={(e) =>
                setEditData({ ...editData, readTime: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="Image URL"
              placeholder="Paste image link here"
              value={editData.image}
              onChange={(e) =>
                setEditData({ ...editData, image: e.target.value })
              }
              fullWidth
            />

            {editData.image && (
              <Box>
                <Typography sx={{ fontSize: 13, color: '#64748b', mb: 1 }}>
                  Image Preview
                </Typography>

                <img
                  src={editData.image}
                  alt="preview"
                  style={{
                    width: '160px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                  }}
                />
              </Box>
            )}

            <TextField
              label="Article Content"
              value={editData.content}
              onChange={(e) =>
                setEditData({ ...editData, content: e.target.value })
              }
              fullWidth
              multiline
              minRows={8}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleSave}>
            {selectedArticle ? 'Save Changes' : 'Add Article'}
          </Button>
        </DialogActions>
      </Dialog>

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

export default DashArticleListPage;