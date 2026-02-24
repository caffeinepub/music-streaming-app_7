import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import SearchPage from './pages/SearchPage';
import PlaylistsPage from './pages/PlaylistsPage';
import PlaylistDetailPage from './pages/PlaylistDetailPage';
import { AudioPlayerProvider } from './hooks/useAudioPlayer';

const rootRoute = createRootRoute({
  component: () => (
    <AudioPlayerProvider>
      <Layout>
        <Outlet />
      </Layout>
    </AudioPlayerProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const libraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/library',
  component: LibraryPage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/search',
  component: SearchPage,
});

const playlistsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/playlists',
  component: PlaylistsPage,
});

const playlistDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/playlists/$playlistName',
  component: PlaylistDetailPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  libraryRoute,
  searchRoute,
  playlistsRoute,
  playlistDetailRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
