import { HomeOutlined, ProductionQuantityLimitsOutlined, DeliveryDiningOutlined, ReceiptLongOutlined, ReportOffOutlined, SettingsAccessibilityOutlined } from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";

interface ISidebarValue {
    text: string,
    icon?: React.ReactElement<SvgIconProps> | null
}

export const SidebarValueLists: ISidebarValue[] = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />
    },
    {
        text: "Products",
        icon: <ProductionQuantityLimitsOutlined />
    },
    {
        text: "Orders",
        icon: <DeliveryDiningOutlined />
    },
    {
        text: "Receptions",
        icon: <ReceiptLongOutlined />
    },
    {
        text: "Reports",
        icon: <ReportOffOutlined />
    },
    {
        text: "Settings",
        icon: <SettingsAccessibilityOutlined />
    },
]