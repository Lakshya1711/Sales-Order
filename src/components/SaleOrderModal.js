import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Button,
  Box,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";

// Simulated products data; replace with actual API call if necessary
const products = [
  { id: 1, name: "Product 1", price: 100, quantity: 50 },
  { id: 2, name: "Product 2", price: 150, quantity: 30 },
  { id: 3, name: "Product 3", price: 200, quantity: 20 },
];

const SaleOrderModal = ({ isOpen, onClose, initialData = {}, readOnly }) => {
  const [invoiceNo, setInvoiceNo] = useState(initialData.invoice_no || "");
  const [invoiceDate, setInvoiceDate] = useState(
    initialData.invoice_date || ""
  );
  const [customerName, setCustomerName] = useState(
    initialData.customer_name || ""
  );
  const [contactNo, setContactNo] = useState(initialData.contact_no || "");
  const [selectedProducts, setSelectedProducts] = useState(
    initialData.items || []
  );
  const [isPaid, setIsPaid] = useState(initialData.paid || false);

  const handleProductSelect = (e) => {
    const productId = parseInt(e.target.value);
    if (productId) {
      const product = products.find((p) => p.id === productId);
      if (product && !selectedProducts.some((p) => p.id === productId)) {
        setSelectedProducts([
          ...selectedProducts,
          { ...product, selectedQuantity: 1 },
        ]);
      }
    }
  };

  const handleQuantityChange = (id, quantity) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p.id === id ? { ...p, selectedQuantity: quantity } : p
      )
    );
  };

  const calculateTotal = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price * product.selectedQuantity,
      0
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sales Order Form</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Invoice Number</FormLabel>
              <Input
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                readOnly={readOnly}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Invoice Date</FormLabel>
              <Input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                readOnly={readOnly}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Customer Name</FormLabel>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                readOnly={readOnly}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contact Number</FormLabel>
              <Input
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                readOnly={readOnly}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Products</FormLabel>
              <Select
                onChange={handleProductSelect}
                placeholder="Select product"
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Select>
              {selectedProducts.map((product) => (
                <Box key={product.id} mt={2}>
                  <HStack justifyContent="space-between">
                    <Text>{product.name}</Text>
                    <Text>Price: ${product.price}</Text>
                    <Text>Quantity Left: {product.quantity}</Text>
                    <Input
                      type="number"
                      min={1}
                      max={product.quantity}
                      value={product.selectedQuantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          product.id,
                          parseInt(e.target.value)
                        )
                      }
                      readOnly={readOnly}
                      width="60px"
                    />
                  </HStack>
                </Box>
              ))}
            </FormControl>
            <HStack justifyContent="space-between" width="100%">
              <Checkbox
                isChecked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
                isDisabled={readOnly}
              >
                Is Paid
              </Checkbox>
              <Box>
                <Text>Total Price: ${calculateTotal().toFixed(2)}</Text>
                <Text>Total Items: {selectedProducts.length}</Text>
              </Box>
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Discard
          </Button>
          {!readOnly && <Button colorScheme="blue">Create Sale Order</Button>}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderModal;
