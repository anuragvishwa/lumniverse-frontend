import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import {
  PiShoppingCartDuotone,
  PiHeadsetDuotone,
  PiPackageDuotone,
  PiChartBarDuotone,
  PiCurrencyDollarDuotone,
  PiSquaresFourDuotone,
  PiGridFourDuotone,
  PiFeatherDuotone,
  PiChartLineUpDuotone,
  PiMapPinLineDuotone,
  PiUserGearDuotone,
  PiBellSimpleRingingDuotone,
  PiUserDuotone,
  PiEnvelopeSimpleOpenDuotone,
  PiStepsDuotone,
  PiCreditCardDuotone,
  PiTableDuotone,
  PiBrowserDuotone,
  PiHourglassSimpleDuotone,
  PiUserCircleDuotone,
  PiShootingStarDuotone,
  PiRocketLaunchDuotone,
  PiFolderLockDuotone,
  PiBinocularsDuotone,
  PiHammerDuotone,
  PiNoteBlankDuotone,
  PiUserPlusDuotone,
  PiShieldCheckDuotone,
  PiLockKeyDuotone,
  PiChatCenteredDotsDuotone,
  PiCalendarPlusDuotone,
  PiEnvelopeDuotone,
  PiCurrencyCircleDollarDuotone,
  PiBriefcaseDuotone,
  PiHouseLineDuotone,
  PiAirplaneTiltDuotone,
  PiFolder,
  PiCaretCircleUpDownDuotone,
  PiListNumbersDuotone,
  PiCoinDuotone,
  PiCalendarDuotone,
  PiShapesDuotone,
  PiNewspaperClippingDuotone,
  PiCodesandboxLogoDuotone,
  PiSparkleDuotone,
  PiCardsDuotone,
  PiMagnifyingGlassDuotone,
  PiStar,
  PiStandardDefinition,
} from 'react-icons/pi';
import ProjectWriteIcon from '@core/components/icons/project-write';
import CrmDashIcon from '@core/components/icons/crm-icon';
import CogSolidIcon from '@core/components/icons/cog-solid';
import {
  MdFilter,
  MdIntegrationInstructions,
  MdRecommend,
} from 'react-icons/md';
import { BiCustomize, BiSupport } from 'react-icons/bi';
import SalesIcon from '@core/components/icons/sales';
import { SiChatbot } from 'react-icons/si';
import { BsController, BsFunnel, BsPerson } from 'react-icons/bs';
import { RiRobot2Fill } from 'react-icons/ri';
import TicketIcon from '@core/components/icons/ticket';
import { FaFilter } from 'react-icons/fa';
import { IoSearchCircle } from 'react-icons/io5';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: 'Overview',
  },
  // label end
  {
    name: 'Appearance',
    href: '/',
    icon: <BiCustomize />,
  },
  // {
  //   name: 'Settings',
  //   href: '/settings',
  //   icon: <CogSolidIcon />,
  // },
  {
    name: 'Integrations',
    href: '/integrations',
    icon: <MdIntegrationInstructions />,
  },
  {
    name: 'Playground',
    href: '/playground',
    icon: <RiRobot2Fill />,
  },

  // {
  //   name: 'Customize',
  //   href: '/customize',
  //   icon: ,
  // },
  {
    name: 'Sales',
    href: '/sales',
    icon: <SalesIcon />,
  },
  {
    name: 'Leads',
    href: '/leads',
    icon: <BsPerson />,
  },
  {
    name: 'Support',
    href: '/support',
    icon: <BiSupport />,
  },
  {
    name: 'Personalize Cards',
    href: '/personalize-cards',
    icon: <PiShoppingCartDuotone />,
  },
  {
    name: 'Recent Cards',
    href: '/recent-cards',
    icon: <PiCardsDuotone />,
  },
  {
    name: 'Search Cards',
    href: '/search-cards',
    icon: <PiMagnifyingGlassDuotone />,
  },
  {
    name: 'Funnel',
    href: '/funnel',
    icon: <BsFunnel />,
  },
  {
    name: 'Filters',
    href: '/fickets',
    icon: <FaFilter />,
    dropdownItems: [
      {
        name: 'Merchandising',
        href: '/filters/merchandising',
        badge: '',
      },
      {
        name: 'Manage Filters',
        href: '/filters/manage-filters',
        badge: '',
      },
      // {
      //   name: 'Leads',
      //   href: '/tickets/leads',
      //   badge: '',
      // },
    ],
  },
  {
    name: 'Tickets',
    href: '/tickets',
    icon: <TicketIcon />,
    dropdownItems: [
      {
        name: 'Tickets',
        href: '/tickets/tickets',
        badge: '',
      },
      {
        name: 'Sales',
        href: '/tickets/sales',
        badge: '',
      },
      {
        name: 'Leads',
        href: '/tickets/leads',
        badge: '',
      },
    ],
  },

  {
    name: 'Recommendation',
    href: '/recommendation',
    icon: <MdRecommend />,
    dropdownItems: [
      {
        name: 'Recommendation Widget',
        href: '/recommendation/recommendation-widgets',
        badge: '',
      },
      {
        name: 'Predictive Bundle',
        href: '/recommendation/predictive-bundle',
        badge: '',
      },
      {
        name: 'General Settings',
        href: '/recommendation/recommendation-general',
        badge: '',
      },
    ],
  },
  // {
  //   name: 'Appointment',
  //   href: routes.appointment.dashboard,
  //   icon: <PiCalendarDuotone />,
  // },
  // {
  //   name: 'Executive',
  //   href: routes.executive.dashboard,
  //   icon: <PiBriefcaseDuotone />,
  // },
  // {
  //   name: 'Project',
  //   href: routes.project.dashboard,
  //   icon: <ProjectWriteIcon />,
  // },
  // {
  //   name: 'CRM',
  //   href: routes.crm.dashboard,
  //   icon: <CrmDashIcon />,
  //   badge: 'NEW',
  // },
  // {
  //   name: 'Social Media',
  //   href: routes.socialMedia.dashboard,
  //   icon: <PiSparkleDuotone />,
  // },
  // {
  //   name: 'Job Board',
  //   href: routes.jobBoard.dashboard,
  //   icon: <PiShapesDuotone />,
  // },
  // {
  //   name: 'Financial',
  //   href: routes.financial.dashboard,
  //   icon: <PiCurrencyCircleDollarDuotone />,
  // },
  // {
  //   name: 'Logistics',
  //   href: routes.logistics.dashboard,
  //   icon: <PiPackageDuotone />,
  // },

  {
    name: 'Analytics',
    href: '/analytics/sales',
    icon: <PiChartBarDuotone />,
    dropdownItems: [
      {
        name: 'Support',
        href: '/analytics/support',
        badge: '',
      },
      {
        name: 'Sales',
        href: '/analytics/sales',
        badge: '',
      },
      {
        name: 'Engagement',
        href: '/analytics/engagement',
        badge: '',
      },
    ],
  },
  // {
  //   name: 'Support',
  //   href: routes.support.dashboard,
  //   icon: <PiHeadsetDuotone />,
  // },

  {
    name: 'AI Train',
    href: '/ai-training/train',
    icon: <SiChatbot />,
    dropdownItems: [
      {
        name: 'Test & Training',
        href: '/ai-training/train',
        badge: '',
      },
      {
        name: 'Faq',
        href: '/ai-training/faq',
        badge: '',
      },
      {
        name: 'URL Sources',
        href: '/ai-training/url-sources',
        badge: '',
      },
      {
        name: 'File Sources',
        href: '/ai-training/file-sources',
        badge: '',
      },
      {
        name: 'AI Personality',
        href: '/ai-training/ai-personality',
        badge: '',
      },
      {
        name: 'Data Gaps',
        href: '/ai-training/data-gaps',
        badge: '',
      },
    ],
  },
  // {
  //   name: 'Support',
  //   href: '#',
  //   icon: <PiHeadsetDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Inbox',
  //       href: routes.support.inbox,
  //     },
  //     {
  //       name: 'Snippets',
  //       href: routes.support.snippets,
  //     },
  //     {
  //       name: 'Templates',
  //       href: routes.support.templates,
  //     },
  //   ],
  // },
  // {
  //   name: 'Invoice',
  //   href: '#',
  //   icon: <PiCurrencyDollarDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'List',
  //       href: routes.invoice.home,
  //     },
  //     {
  //       name: 'Details',
  //       href: routes.invoice.details(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create',
  //       href: routes.invoice.create,
  //     },
  //     {
  //       name: 'Edit',
  //       href: routes.invoice.edit(DUMMY_ID),
  //     },
  //   ],
  // },
  // {
  //   name: 'Logistics',
  //   href: '#',
  //   icon: <PiPackageDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Shipment List',
  //       href: routes.logistics.shipmentList,
  //     },
  //     {
  //       name: 'Shipment Details',
  //       href: routes.logistics.shipmentDetails(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create Shipment',
  //       href: routes.logistics.createShipment,
  //     },
  //     {
  //       name: 'Edit Shipment',
  //       href: routes.logistics.editShipment(DUMMY_ID),
  //     },
  //     {
  //       name: 'Customer Profile',
  //       href: routes.logistics.customerProfile,
  //     },
  //     {
  //       name: 'Tracking',
  //       href: routes.logistics.tracking(DUMMY_ID),
  //     },
  //   ],
  // },
  // {
  //   name: 'Job Feeds',
  //   href: routes.jobBoard.jobFeed,
  //   icon: <PiShapesDuotone />,
  // },
  // {
  //   name: 'Appointment',
  //   href: routes.appointment.appointmentList,
  //   icon: <PiCalendarDuotone />,
  // },
  // {
  //   name: 'File Manager',
  //   href: routes.file.manager,
  //   icon: <PiFolder />,
  // },
  // {
  //   name: 'Event Calendar',
  //   href: routes.eventCalendar,
  //   icon: <PiCalendarPlusDuotone />,
  // },
  // {
  //   name: 'Roles & Permissions',
  //   href: routes.rolesPermissions,
  //   icon: <PiFolderLockDuotone />,
  // },
  // {
  //   name: 'Point of Sale',
  //   href: routes.pos.index,
  //   icon: <PiCreditCardDuotone />,
  // },
  // {
  //   name: 'Invoice Builder',
  //   href: routes.invoice.builder,
  //   icon: <PiNewspaperClippingDuotone />,
  // },
  // {
  //   name: 'Image Viewer',
  //   href: routes.imageViewer,
  //   icon: <PiCodesandboxLogoDuotone />,
  //   badge: 'NEW',
  // },
  // // label start
  {
    name: 'Search & Filters',
  },
  {
    name: 'AI Powered Search',
    href: '/search/ai-powered-search',
    icon: <IoSearchCircle />,
  },
  {
    name: 'Search Control',
    href: '/search/search-control',
    icon: <BsController />,
  },
  {
    name: 'Standard Search',
    href: '/search/standard-search',
    icon: <PiStandardDefinition />,
  },
  // {
  //   name: 'Flight Booking',
  //   href: routes.searchAndFilter.flight,
  //   icon: <PiAirplaneTiltDuotone />,
  // },
  // {
  //   name: 'NFT',
  //   href: routes.searchAndFilter.nft,
  //   icon: <PiCoinDuotone />,
  // },
  // // label end
  // // label start
  // {
  //   name: 'Widgets',
  // },
  // // label end
  // {
  //   name: 'Cards',
  //   href: routes.widgets.cards,
  //   icon: <PiSquaresFourDuotone />,
  // },
  // {
  //   name: 'Icons',
  //   href: routes.widgets.icons,
  //   icon: <PiFeatherDuotone />,
  // },
  // {
  //   name: 'Charts',
  //   href: routes.widgets.charts,
  //   icon: <PiChartLineUpDuotone />,
  // },
  // // {
  // //   name: 'Banners',
  // //   href: routes.widgets.banners,
  // //   icon: <PiImageDuotone />,
  // // },
  // {
  //   name: 'Maps',
  //   href: routes.widgets.maps,
  //   icon: <PiMapPinLineDuotone />,
  // },
  // {
  //   name: 'Email Templates',
  //   href: routes.emailTemplates,
  //   icon: <PiEnvelopeDuotone />,
  // },
  // // label start
  // {
  //   name: 'Forms',
  // },
  // // label end
  // {
  //   name: 'Account Settings',
  //   href: routes.forms.profileSettings,
  //   icon: <PiUserGearDuotone />,
  // },
  // {
  //   name: 'Notification Preference',
  //   href: routes.forms.notificationPreference,
  //   icon: <PiBellSimpleRingingDuotone />,
  // },
  // {
  //   name: 'Personal Information',
  //   href: routes.forms.personalInformation,
  //   icon: <PiUserDuotone />,
  // },
  // {
  //   name: 'Newsletter',
  //   href: routes.forms.newsletter,
  //   icon: <PiEnvelopeSimpleOpenDuotone />,
  // },
  // {
  //   name: 'Multi Step',
  //   href: routes.multiStep,
  //   icon: <PiStepsDuotone />,
  // },
  // {
  //   name: 'Payment Checkout',
  //   href: routes.eCommerce.checkout,
  //   icon: <PiCreditCardDuotone />,
  // },
  // // label start
  // {
  //   name: 'Tables',
  // },
  // // label end
  // {
  //   name: 'Basic',
  //   href: routes.tables.basic,
  //   icon: <PiGridFourDuotone />,
  // },
  // {
  //   name: 'Collapsible',
  //   href: routes.tables.collapsible,
  //   icon: <PiCaretCircleUpDownDuotone />,
  // },
  // {
  //   name: 'Enhanced',
  //   href: routes.tables.enhanced,
  //   icon: <PiTableDuotone />,
  // },
  // {
  //   name: 'Sticky Header',
  //   href: routes.tables.stickyHeader,
  //   icon: <PiBrowserDuotone />,
  // },
  // {
  //   name: 'Pagination',
  //   href: routes.tables.pagination,
  //   icon: <PiListNumbersDuotone />,
  // },
  // {
  //   name: 'Search',
  //   href: routes.tables.search,
  //   icon: <PiHourglassSimpleDuotone />,
  // },
  // {
  //   name: 'TanStack Table',
  //   href: '#',
  //   icon: <PiTableDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Basic',
  //       href: routes.tables.tanTable,
  //     },
  //     {
  //       name: 'Resizable',
  //       href: routes.tables.tanTableResizable,
  //     },
  //     {
  //       name: 'Collapsible',
  //       href: routes.tables.tanTableCollapsible,
  //     },
  //     {
  //       name: 'Drag & Drop',
  //       href: routes.tables.tanTableDnD,
  //     },
  //     {
  //       name: 'Pinning',
  //       href: routes.tables.tanTablePinning,
  //     },
  //     {
  //       name: 'Enhanced',
  //       href: routes.tables.tanTableEnhanced,
  //     },
  //   ],
  // },
  // // label start
  // {
  //   name: 'Pages',
  // },
  // {
  //   name: 'Profile',
  //   href: routes.profile,
  //   icon: <PiUserCircleDuotone />,
  // },
  // {
  //   name: 'Welcome',
  //   href: routes.welcome,
  //   icon: <PiShootingStarDuotone />,
  // },
  // {
  //   name: 'Coming soon',
  //   href: routes.comingSoon,
  //   icon: <PiRocketLaunchDuotone />,
  // },
  // {
  //   name: 'Access Denied',
  //   href: routes.accessDenied,
  //   icon: <PiFolderLockDuotone />,
  // },
  // {
  //   name: 'Not Found',
  //   href: routes.notFound,
  //   icon: <PiBinocularsDuotone />,
  // },
  // {
  //   name: 'Maintenance',
  //   href: routes.maintenance,
  //   icon: <PiHammerDuotone />,
  // },
  // {
  //   name: 'Blank',
  //   href: routes.blank,
  //   icon: <PiNoteBlankDuotone />,
  // },

  // // label start
  // {
  //   name: 'Authentication',
  // },
  // // label end
  // {
  //   name: 'Sign Up',
  //   href: '#',
  //   icon: <PiUserPlusDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Modern Sign up',
  //       href: routes.auth.signUp1,
  //     },
  //     {
  //       name: 'Vintage Sign up',
  //       href: routes.auth.signUp2,
  //     },
  //     {
  //       name: 'Trendy Sign up',
  //       href: routes.auth.signUp3,
  //     },
  //     {
  //       name: 'Elegant Sign up',
  //       href: routes.auth.signUp4,
  //     },
  //     {
  //       name: 'Classic Sign up',
  //       href: routes.auth.signUp5,
  //     },
  //   ],
  // },
  // {
  //   name: 'Sign In',
  //   href: '#',
  //   icon: <PiShieldCheckDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Modern Sign in',
  //       href: routes.auth.signIn1,
  //     },
  //     {
  //       name: 'Vintage Sign in',
  //       href: routes.auth.signIn2,
  //     },
  //     {
  //       name: 'Trendy Sign in',
  //       href: routes.auth.signIn3,
  //     },
  //     {
  //       name: 'Elegant Sign in',
  //       href: routes.auth.signIn4,
  //     },
  //     {
  //       name: 'Classic Sign in',
  //       href: routes.auth.signIn5,
  //     },
  //   ],
  // },
  // {
  //   name: 'Forgot Password',
  //   href: '#',
  //   icon: <PiLockKeyDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Modern Forgot password',
  //       href: routes.auth.forgotPassword1,
  //     },
  //     {
  //       name: 'Vintage Forgot password',
  //       href: routes.auth.forgotPassword2,
  //     },
  //     {
  //       name: 'Trendy Forgot password',
  //       href: routes.auth.forgotPassword3,
  //     },
  //     {
  //       name: 'Elegant Forgot password',
  //       href: routes.auth.forgotPassword4,
  //     },
  //     {
  //       name: 'Classic Forgot password',
  //       href: routes.auth.forgotPassword5,
  //     },
  //   ],
  // },
  // {
  //   name: 'OTP Pages',
  //   href: '#',
  //   icon: <PiChatCenteredDotsDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Modern OTP page',
  //       href: routes.auth.otp1,
  //     },
  //     {
  //       name: 'Vintage OTP page',
  //       href: routes.auth.otp2,
  //     },
  //     {
  //       name: 'Trendy OTP page',
  //       href: routes.auth.otp3,
  //     },
  //     {
  //       name: 'Elegant OTP page',
  //       href: routes.auth.otp4,
  //     },
  //     {
  //       name: 'Classic OTP page',
  //       href: routes.auth.otp5,
  //     },
  //   ],
  // },
];
