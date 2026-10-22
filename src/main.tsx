import { StrictMode, Component, type ErrorInfo, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// ErrorBoundary to prevent blank screen freezes on mobile devices
interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error?: Error;
}

class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('PWA Global caught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#EADECA',
          color: '#1c1917',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'sans-serif',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
            অ্যাপটি পুনরায় লোড করুন
          </h2>
          <p style={{ color: '#44403c', fontSize: '14px', marginBottom: '16px' }}>
            একটি নতুন আপডেট পাওয়া গেছে। নিচে ক্লিক করে ফ্রেশ স্ক্রিনে যান।
          </p>
          <button
            onClick={() => {
              if ('caches' in window) {
                caches.keys().then((names) => {
                  names.forEach((name) => caches.delete(name));
                });
              }
              window.location.reload();
            }}
            style={{
              padding: '12px 24px',
              backgroundColor: '#1c1917',
              color: '#fef08a',
              borderRadius: '12px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            রিলোড ও আপডেট করুন
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Register PWA Service Worker for Mobile Installation with Instant Update Trigger
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      // Force immediate check for sw updates
      registration.update();
    }).catch((err) => {
      console.log('SW registration error:', err);
    });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </StrictMode>,
)
