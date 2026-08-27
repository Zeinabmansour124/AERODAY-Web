import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import img from '../../../assets/images/cao.jpg';

// ============================================
// Viewer 3D — Avion de Secours / Rescue VTOL
// ============================================
const CAD3DViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F1F5F9');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(12, 9, 14);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 1.5, 0);
    controlsRef.current = controls;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(15, 25, 15);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const gridHelper = new THREE.GridHelper(30, 30, 0x3b82f6, 0xcbd5e1);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    const planeGroup = new THREE.Group();

    const whiteBodyMat = new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.15, metalness: 0.1 });
    const wingMat = new THREE.MeshStandardMaterial({ color: '#F8FAFC', roughness: 0.2, metalness: 0.1 });
    const rescueOrangeMat = new THREE.MeshStandardMaterial({ color: '#FF4D00', roughness: 0.3 });
    const darkMat = new THREE.MeshStandardMaterial({ color: '#0F172A', roughness: 0.2, metalness: 0.8 });
    const beaconMat = new THREE.MeshBasicMaterial({ color: '#EF4444' });

    const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.35, 7, 24), whiteBodyMat);
    fuselage.rotation.z = Math.PI / 2;
    fuselage.position.y = 1.5;
    planeGroup.add(fuselage);

    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.5, 24), rescueOrangeMat);
    nose.rotation.z = -Math.PI / 2;
    nose.position.set(4.25, 1.5, 0);
    planeGroup.add(nose);

    const mainWing = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 11), wingMat);
    mainWing.position.set(0.5, 1.7, 0);
    planeGroup.add(mainWing);

    const wingTipLeft = new THREE.Mesh(new THREE.BoxGeometry(2.21, 0.11, 1.2), rescueOrangeMat);
    wingTipLeft.position.set(0.5, 1.7, -4.9);
    planeGroup.add(wingTipLeft);

    const wingTipRight = new THREE.Mesh(new THREE.BoxGeometry(2.21, 0.11, 1.2), rescueOrangeMat);
    wingTipRight.position.set(0.5, 1.7, 4.9);
    planeGroup.add(wingTipRight);

    const crossBar1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.02, 0.25), rescueOrangeMat);
    crossBar1.position.set(1.0, 1.96, 0);
    planeGroup.add(crossBar1);
    const crossBar2 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.02, 0.8), rescueOrangeMat);
    crossBar2.position.set(1.0, 1.96, 0);
    planeGroup.add(crossBar2);

    const gimbalBase = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.3, 16), darkMat);
    gimbalBase.position.set(3.2, 1.15, 0);
    planeGroup.add(gimbalBase);

    const gimbalSphere = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), darkMat);
    gimbalSphere.position.set(3.2, 0.95, 0);
    planeGroup.add(gimbalSphere);

    const lidarDome = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), rescueOrangeMat);
    lidarDome.position.set(-0.5, 1.75, 0);
    planeGroup.add(lidarDome);

    const boomGeo = new THREE.BoxGeometry(4.5, 0.25, 0.25);
    const boomLeft = new THREE.Mesh(boomGeo, whiteBodyMat);
    boomLeft.position.set(0.5, 1.8, -3.2);
    planeGroup.add(boomLeft);

    const boomRight = new THREE.Mesh(boomGeo, whiteBodyMat);
    boomRight.position.set(0.5, 1.8, 3.2);
    planeGroup.add(boomRight);

    const rotorGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.03, 16);
    const rotorPositions = [
      [2.2, 2.0, -3.2],
      [-1.2, 2.0, -3.2],
      [2.2, 2.0, 3.2],
      [-1.2, 2.0, 3.2],
    ];

    rotorPositions.forEach(([x, y, z]) => {
      const motorBase = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.4, 12), rescueOrangeMat);
      motorBase.position.set(x, y - 0.1, z);
      planeGroup.add(motorBase);

      const rotor = new THREE.Mesh(rotorGeo, darkMat);
      rotor.position.set(x, y, z);
      planeGroup.add(rotor);
    });

    const tail = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.4, 0.1), wingMat);
    tail.position.set(-2.8, 2.3, 0);
    tail.rotation.z = Math.PI / 6;
    planeGroup.add(tail);

    const beaconLight = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), beaconMat);
    beaconLight.position.set(-3.1, 2.9, 0);
    planeGroup.add(beaconLight);

    scene.add(planeGroup);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      beaconMat.opacity = Math.sin(elapsed * 10) > 0 ? 1.0 : 0.2;
      beaconMat.transparent = true;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const setCameraView = (axis: 'X' | 'Y' | 'Z') => {
    if (!cameraRef.current || !controlsRef.current) return;
    const cam = cameraRef.current;
    const ctrl = controlsRef.current;

    switch (axis) {
      case 'X':
        cam.position.set(18, 1.5, 0);
        break;
      case 'Y':
        cam.position.set(0, 20, 0.1);
        break;
      case 'Z':
        cam.position.set(0, 1.5, 18);
        break;
    }
    ctrl.target.set(0, 1.5, 0);
    ctrl.update();
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '320px' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '24px',
          zIndex: 10,
          background: '#FF4D00',
          color: '#FFFFFF',
          padding: '6px 18px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          animation: 'pulse 1.5s ease-in-out infinite',
        }} />
        Challenge CAO
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '8px 12px',
          borderRadius: '24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
          backdropFilter: 'blur(4px)',
          userSelect: 'none',
        }}
      >
        <button
          onClick={() => setCameraView('X')}
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: '#EF4444',
            color: '#FFF',
            border: 'none',
            fontWeight: 800,
            fontSize: '11px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Axe X (Profil)"
        >
          X
        </button>
        <button
          onClick={() => setCameraView('Y')}
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: '#22C55E',
            color: '#FFF',
            border: 'none',
            fontWeight: 800,
            fontSize: '11px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Axe Y (Vue du dessus)"
        >
          Y
        </button>
        <button
          onClick={() => setCameraView('Z')}
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: '#3B82F6',
            color: '#FFF',
            border: 'none',
            fontWeight: 800,
            fontSize: '11px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Axe Z (Face)"
        >
          Z
        </button>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '140px',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: 700,
          color: '#1E293B',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        }}
      >
        01/02
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
};

// ============================================
// MODALE INSCRIPTION NON DISPONIBLE - Palette page
// ============================================
const InscriptionModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: 1040, backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />
      <div
        className="position-fixed top-50 start-50 translate-middle"
        style={{ zIndex: 1050, width: '100%', maxWidth: '480px', animation: 'modalFadeIn 0.3s ease-out' }}
      >
        <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 text-center" style={{ borderTop: '4px solid #FF4D00' }}>
          <div className="mb-3">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: '70px', height: '70px', background: '#FFF7ED' }}>
              <span style={{ fontSize: '35px' }}>📝</span>
            </div>
          </div>
          <h4 className="mb-2" style={{ color: '#0F172A', fontWeight: 700, fontSize: '20px' }}>
            Inscription non disponible
          </h4>
          <p className="mb-4" style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.6 }}>
            Les inscriptions pour ce challenge ne sont pas encore ouvertes.<br />
            Veuillez revenir ultérieurement.
          </p>
          <button
            className="btn text-white border-0 px-5 py-2"
            onClick={onClose}
            style={{ background: '#FF4D00', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#E04400')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#FF4D00')}
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
};

// ============================================
// MODALE CAHIER DES CHARGES NON DISPONIBLE - Palette page
// ============================================
const CahierModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: 1040, backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />
      <div
        className="position-fixed top-50 start-50 translate-middle"
        style={{ zIndex: 1050, width: '100%', maxWidth: '480px', animation: 'modalFadeIn 0.3s ease-out' }}
      >
        <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 text-center" style={{ borderTop: '4px solid #FF4D00' }}>
          <div className="mb-3">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: '70px', height: '70px', background: '#FFF7ED' }}>
              <span style={{ fontSize: '35px' }}>📄</span>
            </div>
          </div>
          <h4 className="mb-2" style={{ color: '#0F172A', fontWeight: 700, fontSize: '20px' }}>
            Cahier des charges indisponible
          </h4>
          <p className="mb-4" style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.6 }}>
            Le cahier des charges pour ce challenge n'est pas encore disponible.<br />
            Veuillez revenir ultérieurement.
          </p>
          <button
            className="btn text-white border-0 px-5 py-2"
            onClick={onClose}
            style={{ background: '#FF4D00', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#E04400')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#FF4D00')}
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
};

// ============================================
// Carte Principale Challenge CAO
// ============================================
const CAODisasterChallengeCard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCahierModal, setShowCahierModal] = useState(false);

  const handleInscriptionClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCahierClick = () => setShowCahierModal(true);
  const handleCloseCahierModal = () => setShowCahierModal(false);

  return (
    <>
      <div
        className="ms-3"
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(15, 27, 60, 0.08)',
          position: 'relative',
          maxWidth: '900px',
          width: '100%',
          margin: '20px auto',
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}
      >
        {/* Banner 3D */}
        <CAD3DViewer />

        {/* Contenu carte */}
        <div style={{ padding: '36px 40px 40px 40px' }}>

          {/* Box orange avec texte et image à l'intérieur */}
          <div style={{
            background: '#FFF7ED',
            borderRadius: '14px',
            padding: '24px',
            borderLeft: '4px solid #FF4D00',
            marginBottom: '32px',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 200px',
              gap: '24px',
              alignItems: 'start',
            }}>
              <div>
                <p style={{
                  color: '#475569',
                  fontSize: '15px',
                  lineHeight: 1.8,
                  margin: 0,
                }}>
                  Le challenge CAO (Conception Assistée par Ordinateur) est un challenge de 24 heures destiné aux passionnés de design et d&apos;aéronautique. Les participants devront concevoir un modèle 3D innovant et fonctionnel répondant à une problématique dévoilée au début du hackathon, tout en respectant un cahier des charges précis et en utilisant des logiciels de modélisation tels que SolidWorks ou CATIA... À l&apos;issue du challenge, chaque équipe présentera son projet devant un jury qui évaluera les créations selon des critères techniques, esthétiques et fonctionnels.
                </p>
              </div>

              <div style={{
                width: '200px',
                height: '200px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                border: '1px solid #E2E8F0',
                justifySelf: 'center',
              }}>
                <img
                  src={img}
                  alt="Challenge CAO"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Boutons */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
          }}>
            <button
              onClick={handleInscriptionClick}
              style={{
                background: '#FF4D00',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s',
                boxShadow: '0 4px 16px rgba(255, 77, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.background = '#E04400';
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background = '#FF4D00';
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              S'inscrire au Challenge
            </button>
            <button
              onClick={handleCahierClick}
              style={{
                background: 'transparent',
                color: '#0F172A',
                border: '2px solid #0F172A',
                padding: '12px 28px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.background = '#0F172A';
                (e.target as HTMLButtonElement).style.color = '#FFFFFF';
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background = 'transparent';
                (e.target as HTMLButtonElement).style.color = '#0F172A';
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Cahier des charges
            </button>
          </div>
        </div>
      </div>

      {/* Modales */}
      {showModal && <InscriptionModal onClose={handleCloseModal} />}
      {showCahierModal && <CahierModal onClose={handleCloseCahierModal} />}

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.8) translateY(-20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
};

export default CAODisasterChallengeCard;