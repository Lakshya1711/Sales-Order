import React, { useState } from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const fetchCompletedOrders = async () => {
  // replace with actual API call
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

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

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
              <Button onClick={() => handleView(order)}>View</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>

      {/* Detailed Order View Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Completed Sale Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              <strong>Invoice Number:</strong> {selectedOrder?.invoice_no}
            </p>
            <p>
              <strong>Invoice Date:</strong>{" "}
              {formatDate(selectedOrder?.invoice_date)}
            </p>
            <p>
              <strong>Customer Name:</strong> {selectedOrder?.customer_name}
            </p>
            <p>
              <strong>Products:</strong>
            </p>
            <ul>
              {selectedOrder?.items.map((item, index) => (
                <li key={index}>
                  SKU ID: {item.sku_id}, Price: ${item.price}, Quantity:{" "}
                  {item.quantity}
                </li>
              ))}
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Table>
  );
};

// function to calculate total price based on items
const calculateTotal = (items) => {
  return items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export default CompletedSaleOrders;
