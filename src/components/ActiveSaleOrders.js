// src/components/ActiveSaleOrders.js
import React from "react";
import { Table, Tbody, Tr, Td, Thead, Th, Button } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const fetchActiveOrders = async () => {
  // Simulated fetch operation; replace with actual API call
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
              <Button onClick={() => onEdit(order)}>Edit</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

// Helper function to calculate total price based on items
const calculateTotal = (items) => {
  return items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export default ActiveSaleOrders;
