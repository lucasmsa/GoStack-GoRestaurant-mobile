import React, { useEffect, useState, useCallback } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Extra } from '../FoodDetails/index';

import api from '../../services/api';

import formatValue from '../../utils/formatValue';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  formattedValue: number;
  thumbnail_url: string;
}

interface SpecificOrder {
  id: number;
  product_id: number;
  name: string;
  description: string;
  category: number;
  quantity: number;
  price: number;
  thumbnail_url: string;
  extras: Extra[];
}

const Orders: React.FC = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState<Food[]>([]);
  const [specificOrder, setSpecificOrders] = useState<SpecificOrder[]>([]);

  useEffect(() => {
    async function loadOrders(): Promise<void> {
      await api.get('orders').then(response => {
        setOrders(response.data);
        setSpecificOrders(response.data);
      });
    }

    loadOrders();
  }, []);

  const handleNavigateToSpecificOrder = useCallback(
    (id: number): void => {
      console.log(id);
      const orderClicked = specificOrder.find(order => order.id === id);

      orderClicked &&
        navigation.navigate('SpecificOrder', { order: orderClicked });
    },
    [navigation, specificOrder],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus pedidos</HeaderTitle>
      </Header>

      <FoodsContainer>
        <FoodList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Food
              key={item.id}
              activeOpacity={0.6}
              onPress={() => handleNavigateToSpecificOrder(item.id)}
            >
              <FoodImageContainer>
                <Image
                  style={{ width: 88, height: 88 }}
                  source={{ uri: item.thumbnail_url }}
                />
              </FoodImageContainer>
              <FoodContent>
                <FoodTitle>{item.name}</FoodTitle>
                <FoodDescription>{item.description}</FoodDescription>
                <FoodPricing>{formatValue(item.price)}</FoodPricing>
              </FoodContent>
            </Food>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Orders;
