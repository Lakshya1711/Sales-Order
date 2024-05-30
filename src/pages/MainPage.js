import React, { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Flex,
} from "@chakra-ui/react";
import ActiveSaleOrders from "../components/ActiveSaleOrders";
import CompletedSaleOrders from "../components/CompletedSaleOrders";
import SaleOrderModal from "../components/SaleOrderModal";
import DarkModeToggle from "../components/DarkModeToggle";

const MainPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [readOnly, setReadOnly] = useState(false);

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setReadOnly(false);
    setModalOpen(true);
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setReadOnly(true);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedOrder(null);
    setReadOnly(false);
    setModalOpen(true);
  };

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Tabs>
          <TabList>
            <Tab>Active Orders</Tab>
            <Tab>Completed Orders</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ActiveSaleOrders onEdit={handleEdit} />
            </TabPanel>
            <TabPanel>
              <CompletedSaleOrders onView={handleView} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Button onClick={handleCreate} colorScheme="blue" ml={4}>
          + Sale Order
        </Button>
      </Flex>
      {modalOpen && (
        <SaleOrderModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialData={selectedOrder || {}}
          readOnly={readOnly}
        />
      )}
      <Box position="fixed" bottom="2" right="2">
        <DarkModeToggle />
      </Box>
    </Box>
  );
};

export default MainPage;
