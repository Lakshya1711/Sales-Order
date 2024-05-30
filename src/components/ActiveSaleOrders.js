import React from "react";
import { Table, Tbody, Tr, Td, Thead, Th, Button } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const fetchActiveOrders = async () => {
  // replace with actual API call
  return [
    {
      id: 1,
      invoice_no: "INV-001",
      customer_name: "Ram",
      items: [{ sku_id: 220, price: 12, quantity: 12 }],
      paid: false,
      invoice_date: "2024-07-05",
    },
    {
      id: 2,
      invoice_no: "INV-002",
      customer_name: "Shyam",
      items: [{ sku_id: 221, price: 15, quantity: 10 }],
      paid: true,
      invoice_date: "2024-07-06",
    },
  ];
};

const ActiveSaleOrders = ({ onEdit }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["activeOrders"],
    queryFn: fetchActiveOrders,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Invoice No</Th>
          <Th>Customer Name</Th>
          <Th>Total Price</Th>
          <Th>Invoice Date</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((order) => (
          <Tr key={order.id}>
            <Td>{order.id}</Td>
            <Td>{order.invoice_no}</Td>
            <Td>{order.customer_name}</Td>
            <Td>${calculateTotal(order.items)}</Td>
            <Td>{formatDate(order.invoice_date)}</Td>
            <Td>
              <Button onClick={() => handleEdit(order)}>Edit</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  function handleEdit(order) {
    const total = calculateTotal(order.items);
    onEdit({ ...order, total }); // Pass order details along with total price to parent component
  }

  function calculateTotal(items) {
    if (!items || items.length === 0) return 0;

    return items
      .reduce((total, item) => {
        const itemTotal = item.price * item.quantity;
        return total + itemTotal;
      }, 0)
      .toFixed(2);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
};

export default ActiveSaleOrders;
