// PayPalProviderWrapper.jsx
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useGetPaypalClientIdQuery } from "../slices/ordersApiSlice";
import Loader from "../components/Loader";

const PayPalProviderWrapper = ({ children }) => {
  const { data, isLoading } = useGetPaypalClientIdQuery();

  if (isLoading) return <Loader />;
  if (!data || !data.clientId) return <div>PayPal Client ID not found</div>;

  return (
    <PayPalScriptProvider options={{ "client-id": data.clientId }}>
      {children}
    </PayPalScriptProvider>
  );
};

export default PayPalProviderWrapper;
