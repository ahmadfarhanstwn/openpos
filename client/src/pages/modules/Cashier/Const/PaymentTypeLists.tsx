import { SvgIconProps } from "@mui/material"
import { CreditCard, CreditCardOutlined, Money } from '@mui/icons-material'
import Gopay from "../../../../assets/Gopay"

export interface IPaymentTypeValue {
    text: string,
    id: string,
    icon: React.ReactElement<SvgIconProps>
}

const PaymentTypeValues: IPaymentTypeValue[] = [
    {
        text: "Cash",
        id: "cash",
        icon: <Money />
    },
    {
        text: "Debit",
        id: "debit",
        icon: <CreditCard />
    },
    {
        text: "Credit",
        id: "credit",
        icon: <CreditCardOutlined />
    },
    {
        text: "Gopay",
        id: "gopay",
        icon: <Gopay />
    }
]

export default PaymentTypeValues