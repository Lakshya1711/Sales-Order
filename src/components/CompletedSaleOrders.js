// src/components/CompletedSaleOrders.js
import React from "react";
import { Table, Tbody, Tr, Td, Thead, Th, Button } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const fetchCompletedOrders = async () => {
  return [
    {
      id: 3,
      invoice_no: "INV-003",
      customer_name: "Krishna",
      items: [{ sku_id: 222, price: 20, quantity: 8 }],
      paid: true,
      invoice_date: "2024-07-07",
    },
    {
      id: 4,
      invoice_no: "INV-004",
      customer_name: "Govinda",
      items: [{ sku_id: 223, price: 25, quantity: 5 }],
      paid: false,
      invoice_date: "2024-07-08",
    },
  ];
};

const CompletedSaleOrders = ({ onView }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["completedOrders"],
    queryFn: fetchCompletedOrders,
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
              <Button onClick={() => onView(order)}>View</Button>
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

export default CompletedSaleOrders;
