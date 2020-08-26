import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import IconFood from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import {
  Container,
  Header,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodIngredientsTitle,
  FoodIngredientsTop,
  FoodQuantity,
  FoodIngredients,
  FoodIngredientExtra,
  FoodIngredientsBottom,
  FoodIngredientsIndividually,
  FoodIngredientsIcon,
  GoBackButton,
} from './styles';

interface Params {
  id: number;
}

export interface Extra {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

interface Order {
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

interface ParametersInterface {
  order: Order;
}

const SpecificOrder: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { order } = params as ParametersInterface;

  const quantitySpaced = useMemo(() => {
    return ` ${order.quantity}`;
  }, [order.quantity]);

  return (
    <Container>
      <Header>
        <GoBackButton
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={36} color="#FFB84D" />
        </GoBackButton>
      </Header>
      <FoodContent>
        <FoodImageContainer>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: order.thumbnail_url }}
          />
        </FoodImageContainer>
        <FoodTitle>{order.name}</FoodTitle>
        <FoodDescription>{order.description}</FoodDescription>
        <FoodQuantity>Quantidade: {quantitySpaced}</FoodQuantity>
        {order.extras && (
          <FoodIngredients>
            <FoodIngredientsTop>
              <FoodIngredientsTitle>
                Ingredientes adicionados
              </FoodIngredientsTitle>
              <FoodIngredientsIcon>
                <IconFood name="food-variant" color="#FFB84D" size={36} />
              </FoodIngredientsIcon>
            </FoodIngredientsTop>
            <FoodIngredientsBottom>
              {order.extras.map(extra => (
                <FoodIngredientExtra key={extra.id}>
                  {extra.name}
                </FoodIngredientExtra>
              ))}
            </FoodIngredientsBottom>
          </FoodIngredients>
        )}
      </FoodContent>
    </Container>
  );
};

export default SpecificOrder;
