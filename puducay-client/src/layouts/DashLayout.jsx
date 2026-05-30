import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';

import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  InputBase,
  Button,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SearchIcon from '@mui/icons-material/Search';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';

const userType = localStorage.getItem('type')?.toLowerCase();

const dashboardNavItems = [
  {
    label: 'Dashboard',
    title: '',
    to: '/dashboard',
    icon: <DashboardIcon />,
  },

  ...(['admin', 'editor'].includes(userType)
    ? [
        {
          label: 'Reports',
          title: '',
          to: '/dashboard/reports',
          icon: <AssessmentIcon />,
        },
      ]
    : []),

  ...(userType === 'admin'
    ? [
        {
          label: 'Users',
          title: '',
          to: '/dashboard/users',
          icon: <PeopleIcon />,
        },
      ]
    : []),

  ...(['admin', 'editor'].includes(userType)
    ? [
        {
          label: 'Articles',
          title: '',
          to: '/dashboard/articles',
          icon: <ArticleIcon />,
        },
      ]
    : []),
];

const getPageTitle = (pathname) => {
  const item = dashboardNavItems.find((item) => item.to === pathname);

  return item ? item.title : 'Welcome';
};

const DashLayout = () => {
  const [open, setOpen] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle = getPageTitle(location.pathname);

  const handleLogout = () => {
  localStorage.clear();
  navigate('/auth/signin');
};

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#fafafa',
      }}
    >
      {/* SIDEBAR */}
      <Box
        sx={{
          width: open ? 280 : 90,
          transition: 'width 0.3s ease',
          overflow: 'hidden',
          borderRight: '2px solid #18181b',
          backgroundColor: '#f4f4f5',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* SIDEBAR HEADER */}
        <Box
          sx={{
            px: open ? 3 : 2,
            py: 3,
            borderBottom: '2px solid #18181b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'space-between' : 'center',
            transition: '0.3s',
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#18181b',
              whiteSpace: 'nowrap',
              opacity: open ? 1 : 0,
              width: open ? 'auto' : 0,
              overflow: 'hidden',
              transition: '0.2s',
            }}
          >
            
          </Typography>

          <IconButton onClick={() => setOpen(!open)}>
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        {/* NAVIGATION */}
        <List sx={{ px: 2, py: 3 }}>
          {dashboardNavItems.map(({ label, to, icon }) => {
            const active = location.pathname === to;

            return (
              <ListItem
                key={to}
                disablePadding
                sx={{ mb: 1.5 }}
              >
                <ListItemButton
                  component={NavLink}
                  to={to}
                  sx={{
                    border: '2px solid #18181b',
                    borderRadius: '18px',
                    minHeight: 58,
                    backgroundColor: active ? '#18181b' : '#f4f4f5',
                    color: active ? '#fafafa' : '#18181b',
                    justifyContent: open ? 'flex-start' : 'center',
                    px: 2,
                    transition: '0.2s',

                    '&:hover': {
                      backgroundColor: active
                        ? '#18181b'
                        : '#e4e4e7',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: active ? '#fafafa' : '#18181b',
                      minWidth: 0,
                      mr: open ? 2 : 0,
                      justifyContent: 'center',
                      transition: '0.2s',
                    }}
                  >
                    {icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      whiteSpace: 'nowrap',
                    }}
                    sx={{
                      opacity: open ? 1 : 0,
                      transition: 'opacity 0.2s ease',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* LOGOUT */}
        <Box sx={{ mt: 'auto', p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleLogout}
            sx={{
              border: '2px solid #18181b',
              color: '#18181b',
              borderRadius: '16px',
              py: 1.2,
              fontWeight: 600,
              minWidth: 0,

              '&:hover': {
                border: '2px solid #18181b',
                backgroundColor: '#18181b',
                color: '#fafafa',
              },
            }}
          >
            {open ? 'Logout' : '↩'}
          </Button>
        </Box>
      </Box>

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flex: 1,
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* TOPBAR */}
        <Box
          sx={{
            borderBottom: '2px solid #18181b',
            backgroundColor: '#f4f4f5',
            px: { xs: 3, md: 4 },
            py: 2.5,
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            {/* LOGO PLACED ON THE TITLE SITE */}
            <NavLink to="/" className="flex items-center gap-3 group no-underline">
              <div className="w-9 h-9 transition-transform duration-200 group-hover:scale-105">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="5" y="5" width="90" height="90" rx="20" fill="#18181b" />
                  <rect x="20" y="20" width="25" height="25" fill="white" />
                  <rect x="55" y="20" width="25" height="25" fill="white" />
                  <rect x="20" y="55" width="60" height="25" fill="white" />
                </svg>
              </div>

              <div className="leading-tight">
                <p className="text-sm font-bold text-zinc-900 m-0 p-0">Frameflow</p>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 m-0 p-0">
                  UI Workflow
                </p>
              </div>
            </NavLink>

            {/* SEARCH */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '2px solid #18181b',
                borderRadius: '18px',
                backgroundColor: '#fafafa',
                px: 2,
                py: 0.8,
                minWidth: { xs: '100%', sm: 300 },
                maxWidth: 380,
              }}
            >
              <SearchIcon
                sx={{
                  color: '#52525b',
                  mr: 1,
                }}
              />

              <InputBase
                placeholder="Search..."
                sx={{
                  width: '100%',
                  color: '#18181b',
                  fontWeight: 500,
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* PAGE CONTENT */}
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              border: '2px solid #18181b',
              borderRadius: '28px',
              backgroundColor: '#f4f4f5',
              p: { xs: 3, md: 4 },
              height: '100%',
              overflow: 'auto',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashLayout;