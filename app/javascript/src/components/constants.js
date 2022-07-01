// @ts-ignore
import IcCalendar from "images/ic_calendar.svg";
// @ts-ignore
import IcDashboard from "images/ic_dashboard.svg";
// @ts-ignore
import IcHelp from "images/ic_help.svg";
// @ts-ignore
import IcHome from "images/ic_home.svg";
// @ts-ignore
import IcInvoice from "images/ic_invoice.svg";
// @ts-ignore
import IcSetting from "images/ic_setting.svg";
// @ts-ignore
import IcUsers from "images/ic_users.svg";

export const NAV_ITEMS = [
  { label: "Home", to: "/", icon: IcHome },
  { label: "Events", icon: IcCalendar, to: "/events" },
  { label: "Circles", icon: IcUsers, to: "/circles" },
  { label: "Tasks and Notes", icon: IcInvoice, to: "/tasks_and_notes" },
  { label: "Integrations", icon: IcDashboard, to: "/integrations" },
  { label: "Help Center", icon: IcHelp, to: "/help" },
  { label: "Settings", icon: IcSetting, to: "/settings" },
];
