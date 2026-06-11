import React from "react";
const base = (size) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

export const AmbulanceIcon = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M3 7h11v8H3z" />
    <path d="M14 10h4l3 3v2h-7z" />
    <circle cx="7" cy="17" r="1.6" />
    <circle cx="17" cy="17" r="1.6" />
    <path d="M7 9.5v3M5.5 11h3" />
  </svg>
);

export const PoliceIcon = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    <path d="M12 8v6M9 11h6" />
  </svg>
);

export const FireIcon = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-1.5.6-2.5 1.5-3.5C10 9 10.5 6 12 3z" />
    <path d="M12 14a2 2 0 0 0 2-2c0-1-.7-1.6-1.2-2.3" />
  </svg>
);

export const MapIcon = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" />
    <path d="M9 4v14M15 6v14" />
  </svg>
);

export const PinIcon = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" />
    <circle cx="12" cy="11" r="2.2" />
  </svg>
);

export const AiIcon = ({ size = 22 }) => (
  <svg {...base(size)}>
    <rect x="5" y="6" width="14" height="12" rx="3" />
    <path d="M12 6V3M9 11h.01M15 11h.01M9 15h6" />
    <path d="M2 12h2M20 12h2" />
  </svg>
);

export const DashboardIcon = ({ size = 22 }) => (
  <svg {...base(size)}>
    <rect x="3" y="3" width="7" height="9" rx="2" />
    <rect x="14" y="3" width="7" height="5" rx="2" />
    <rect x="14" y="11" width="7" height="10" rx="2" />
    <rect x="3" y="15" width="7" height="6" rx="2" />
  </svg>
);

export const AlertIcon = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M10.3 4.3 2.6 18a1.8 1.8 0 0 0 1.6 2.7h15.6a1.8 1.8 0 0 0 1.6-2.7L13.7 4.3a1.9 1.9 0 0 0-3.4 0z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

export const ActivityIcon = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M3 12h4l2 6 4-14 2 8h6" />
  </svg>
);

export const HeartIcon = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
  </svg>
);

export const PhoneIcon = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M5 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L17 13l5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" />
  </svg>
);

export const SearchIcon = ({ size = 18 }) => (
  <svg {...base(size)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </svg>
);

export const RouteIcon = ({ size = 18 }) => (
  <svg {...base(size)}>
    <circle cx="6" cy="18" r="2.4" />
    <circle cx="18" cy="6" r="2.4" />
    <path d="M8.4 18H14a3 3 0 0 0 0-6H10a3 3 0 0 1 0-6h5.6" />
  </svg>
);

export const ShareIcon = ({ size = 18 }) => (
  <svg {...base(size)}>
    <circle cx="18" cy="5" r="2.4" />
    <circle cx="6" cy="12" r="2.4" />
    <circle cx="18" cy="19" r="2.4" />
    <path d="M8.1 10.8 15.9 6.2M8.1 13.2l7.8 4.6" />
  </svg>
);

export const ClockIcon = ({ size = 18 }) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const SignalIcon = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M4 16v3M9 12v7M14 8v11M19 4v15" />
  </svg>
);

export const LogoutIcon = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
    <path d="M10 17l-5-5 5-5M4 12h11" />
  </svg>
);

export const MenuIcon = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ShieldLogo = ({ size = 26 }) => (
  <svg {...base(size)} strokeWidth={1.6}>
    <path d="M12 3l7 3v5c0 4.6-3 7.7-7 9-4-1.3-7-4.4-7-9V6z" />
    <path d="M9.5 12l1.8 1.8L15 10" />
  </svg>
);
