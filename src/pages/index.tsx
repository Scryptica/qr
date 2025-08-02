import { useState, useRef, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { FaEye, FaEyeSlash, FaWifi, FaDownload } from 'react-icons/fa';

// Modern WiFi icon
const wifiIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
  <path fill="#6b7280" d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
</svg>`;
const wifiIconDataUrl = `data:image/svg+xml;base64,${Buffer.from(wifiIconSvg).toString('base64')}`;

export default function Home() {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState('WPA');
  const [showPassword, setShowPassword] = useState(false);
  const qrRef = useRef<HTMLDivElement | null>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);
  const [qrResolution, setQrResolution] = useState(512);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = () => {
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      const qrData = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
      
      const qrcode = new QRCodeStyling({
        width: 200,
        height: 200,
        type: 'canvas',
        data: qrData,
        image: wifiIconDataUrl,
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.4,
          margin: 8,
        },
        dotsOptions: {
          color: '#374151',
          type: 'rounded',
        },
        cornersDotOptions: {
          type: 'dot',
          color: '#6b7280',
        },
        cornersSquareOptions: {
          type: 'extra-rounded',
          color: '#4b5563',
        },
        backgroundOptions: {
          color: '#ffffff',
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

  const handleDownload = async () => {
    if (!qrRef.current) return;
    setIsGenerating(true);
    
    try {
      const qrData = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
      const qrcode = new QRCodeStyling({
        width: qrResolution,
        height: qrResolution,
        type: 'canvas',
        data: qrData,
        image: wifiIconDataUrl,
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.4,
          margin: 8,
        },
        dotsOptions: {
          color: '#374151',
          type: 'rounded',
        },
        cornersDotOptions: {
          type: 'dot',
          color: '#6b7280',
        },
        cornersSquareOptions: {
          type: 'extra-rounded',
          color: '#4b5563',
        },
        backgroundOptions: {
          color: '#ffffff',
        },
        qrOptions: {
          errorCorrectionLevel: 'H',
        },
      });
      await qrcode.download({ 
        name: `wifi-qr-${ssid || 'network'}`, 
        extension: 'png' 
      });
    } catch (error) {
      console.error('Error downloading QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#374151', // Gray-700
    border: '1px solid #4b5563', // Gray-600
    borderRadius: '8px',
    color: '#f9fafb',
    fontSize: '14px',
    fontWeight: '400',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box' as const,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    color: '#d1d5db',
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#111827', // Gray-900
      backgroundImage: `
        linear-gradient(rgba(55, 65, 81, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(55, 65, 81, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      boxSizing: 'border-box',
      overflow: 'hidden',
      margin: 0,
    }}>
      <div style={{
        background: '#1f2937', // Gray-800
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '900px',
        width: '100%',
        border: '1px solid #374151', // Gray-700
        boxShadow: `
          0 20px 25px -5px rgba(0, 0, 0, 0.4),
          0 10px 10px -5px rgba(0, 0, 0, 0.3)
        `,
        display: 'flex',
        gap: '32px',
        alignItems: 'flex-start',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Left Side - Form */}
        <div style={{
          flex: '1',
          minWidth: '300px',
        }}>
          {/* Header */}
          <div style={{
            marginBottom: '24px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                background: '#4b5563', // Gray-600
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              }}>
                <FaWifi size={20} color="#ffffff" />
              </div>
              <div>
                <h1 style={{
                  color: '#f9fafb',
                  fontSize: '24px',
                  fontWeight: '600',
                  margin: '0 0 4px 0',
                  letterSpacing: '-0.025em',
                }}>
                  Generador QR WiFi
                </h1>
                <p style={{
                  color: '#9ca3af',
                  fontSize: '14px',
                  margin: 0,
                  fontWeight: '400',
                }}>
                  Comparte tu red WiFi fácilmente
                </p>
              </div>
            </div>
          </div>

          <form style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}>
            <div>
              <label style={labelStyle}>Nombre de Red (SSID)</label>
              <input
                type="text"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
                placeholder="Mi_Red_WiFi"
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#6b7280';
                  e.currentTarget.style.backgroundColor = '#4b5563';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#4b5563';
                  e.currentTarget.style.backgroundColor = '#374151';
                }}
              />
            </div>

            <div>
              <label style={labelStyle}>Contraseña</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña de la red"
                  style={{
                    ...inputStyle,
                    paddingRight: '50px',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#6b7280';
                    e.currentTarget.style.backgroundColor = '#4b5563';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#4b5563';
                    e.currentTarget.style.backgroundColor = '#374151';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: '#4b5563', // Gray-600
                    borderRadius: '6px',
                    cursor: 'pointer',
                    padding: '8px',
                    color: '#9ca3af',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#6b7280';
                    e.currentTarget.style.color = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#4b5563';
                    e.currentTarget.style.color = '#9ca3af';
                  }}
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Tipo de Seguridad</label>
              <select
                value={encryption}
                onChange={(e) => setEncryption(e.target.value)}
                style={{
                  ...inputStyle,
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6,9 12,15 18,9"></polyline></svg>'
                  )}")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  backgroundSize: '16px',
                  paddingRight: '40px',
                  cursor: 'pointer',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#6b7280';
                  e.currentTarget.style.backgroundColor = '#4b5563';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#4b5563';
                  e.currentTarget.style.backgroundColor = '#374151';
                }}
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="">Ninguna</option>
              </select>
            </div>
          </form>
        </div>

        {/* Right Side - QR Code */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}>
          <div style={{
            borderRadius: '16px',
            background: '#ffffff',
            width: '240px',
            height: '240px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `
              0 10px 15px -3px rgba(0, 0, 0, 0.3),
              0 4px 6px -2px rgba(0, 0, 0, 0.2)
            `,
            border: '1px solid #374151',
          }}>
            <div ref={qrRef} style={{
              width: '200px',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }} />
          </div>

          {/* Download Controls */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
            }}>
              <label style={{
                color: '#d1d5db',
                fontWeight: '500',
                whiteSpace: 'nowrap',
              }}>
                Resolución:
              </label>
              <select
                value={qrResolution}
                onChange={(e) => setQrResolution(Number(e.target.value))}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #4b5563',
                  background: '#374151',
                  color: '#f9fafb',
                  fontSize: '13px',
                  fontWeight: '400',
                  outline: 'none',
                  appearance: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value={256}>256x256</option>
                <option value={512}>512x512</option>
                <option value={1024}>1024x1024</option>
                <option value={2048}>2048x2048</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isGenerating}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                background: isGenerating 
                  ? '#4b5563' 
                  : '#6b7280', // Gray-500
                color: '#ffffff',
                fontWeight: '600',
                fontSize: '14px',
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxShadow: isGenerating 
                  ? 'none' 
                  : '0 4px 12px rgba(0, 0, 0, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.025em',
                width: '100%',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                if (!isGenerating) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.background = '#4b5563';
                }
              }}
              onMouseLeave={(e) => {
                if (!isGenerating) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.background = '#6b7280';
                }
              }}
            >
              <FaDownload size={12} />
              {isGenerating ? 'Generando...' : 'Descargar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
