import { useState, useRef, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { FaWifi, FaEye, FaEyeSlash } from 'react-icons/fa';

// Create a simple WiFi icon as a data URL
const wifiIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="#000" d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
</svg>`;
const wifiIconDataUrl = `data:image/svg+xml;base64,${Buffer.from(wifiIconSvg).toString('base64')}`;

export default function Home() {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState('WPA');
  const [showPassword, setShowPassword] = useState(false);
  const qrRef = useRef<HTMLDivElement | null>(null);
  const qrCode = useRef<any>(null);
  const [qrResolution, setQrResolution] = useState(512);

  const generateQRCode = (customSize?: number) => {
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      const qrData = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
      const size = 240;
      const qrcode = new QRCodeStyling({
        width: size,
        height: size,
        type: 'canvas',
        data: qrData,
        image: wifiIconDataUrl,
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.5,
          margin: 8,
        },
        dotsOptions: {
          color: '#000',
          type: 'square',
        },
        cornersDotOptions: {
          type: 'square',
        },
        cornersSquareOptions: {
          type: 'square',
        },
        backgroundOptions: {
          color: '#fff',
        },
        qrOptions: {
          errorCorrectionLevel: 'H',
        },
      });
      qrcode.append(qrRef.current);
      qrCode.current = qrcode;
    }
  };

  useEffect(() => {
    generateQRCode();
  }, [ssid, password, encryption]);

  return (
    <div
      style={{
        minHeight: '100vh',
        margin: 0,
        backgroundColor: '#111111ff',
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        fontFamily: 'Inter, Segoe UI, system-ui, sans-serif',
        fontWeight: 400,
        fontSize: '16px',
        letterSpacing: '0.01em',
        boxSizing: 'border-box',
      }}
    >
      <div style={{
        background: 'rgba(36, 36, 36, 0.45)',
        borderRadius: '20px',
        padding: '40px 48px 36px 48px',
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)',
        maxWidth: '520px',
        width: '100%',
        backdropFilter: 'blur(18px) saturate(180%)',
        WebkitBackdropFilter: 'blur(18px) saturate(180%)',
        border: '1.5px solid rgba(255,255,255,0.13)',
        boxSizing: 'border-box',
      }}>
        <h1 style={{
          color: '#fff',
          textAlign: 'center',
          marginBottom: '22px',
          fontSize: '1.6rem',
          fontWeight: 600,
          letterSpacing: '0.01em',
        }}>WiFi QR Code Generator</h1>
        
        <form style={{ marginBottom: '22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              color: '#fff',
              fontSize: '0.98rem',
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}>SSID:</label>
            <input
              type="text"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                backgroundColor: 'rgba(40,40,40,0.85)',
                border: '1.5px solid #444',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 400,
                outline: 'none',
                transition: 'border 0.2s',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              color: '#fff',
              fontSize: '0.98rem',
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}>Password:</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  backgroundColor: 'rgba(40,40,40,0.85)',
                  border: '1.5px solid #444',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 400,
                  outline: 'none',
                  transition: 'border 0.2s',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  color: '#aaa',
                  fontSize: '1.1rem',
                  outline: 'none',
                }}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              color: '#fff',
              fontSize: '0.98rem',
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}>Encryption:</label>
            <select
              value={encryption}
              onChange={(e) => setEncryption(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                backgroundColor: 'rgba(40,40,40,0.85)',
                border: '1.5px solid #444',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 400,
                outline: 'none',
                transition: 'border 0.2s',
                boxSizing: 'border-box',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
              }}
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="">None</option>
            </select>
          </div>
        </form>
        <div style={{
          position: 'relative',
          borderRadius: '10px', // Rounded corners for square
          background: '#fff',
          width: '240px',
          height: '240px',
          margin: '0 auto 0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
          padding: 0,
          overflow: 'hidden',
        }}>
          <div ref={qrRef} style={{
            width: '240px',
            height: '240px',
            background: 'transparent',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
          }} />
        </div>
        <div style={{ marginTop: 18, textAlign: 'center' }}>
          <label style={{ color: '#fff', fontSize: '0.98rem', fontWeight: 500, marginRight: 10 }}>
            Download QR:
          </label>
          <select
            value={qrResolution}
            onChange={e => setQrResolution(Number(e.target.value))}
            style={{
              padding: '7px 14px',
              borderRadius: '7px',
              border: '1.2px solid #444',
              background: 'rgba(40,40,40,0.85)',
              color: '#fff',
              fontSize: '1rem',
              marginRight: 10,
              outline: 'none',
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
            }}
          >
            <option value={256}>256x256</option>
            <option value={512}>512x512</option>
            <option value={1024}>1024x1024</option>
            <option value={2048}>2048x2048</option>
          </select>
          <button
            type="button"
            onClick={async () => {
              if (!qrRef.current) return;
              // Save current QR code
              const prev = qrRef.current.innerHTML;
              // Regenerate at selected resolution
              const qrData = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
              const qrcode = new QRCodeStyling({
                width: qrResolution,
                height: qrResolution,
                type: 'canvas',
                data: qrData,
                image: wifiIconDataUrl,
                imageOptions: {
                  hideBackgroundDots: true,
                  imageSize: 0.5,
                  margin: 8,
                },
                dotsOptions: {
                  color: '#000',
                  type: 'square',
                },
                cornersDotOptions: {
                  type: 'square',
                },
                cornersSquareOptions: {
                  type: 'square',
                },
                backgroundOptions: {
                  color: '#fff',
                },
                qrOptions: {
                  errorCorrectionLevel: 'H',
                },
              });
              await qrcode.download({ name: `wifi-qr-${ssid || 'code'}`, extension: 'png' });
              // Restore on-screen QR code
              qrRef.current.innerHTML = prev;
              generateQRCode();
            }}
            style={{
              padding: '7px 22px',
              borderRadius: '7px',
              border: 'none',
              background: 'linear-gradient(90deg, #4f8cff 0%, #2356c7 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 rgba(79,140,255,0.10)',
              transition: 'background 0.2s',
            }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
