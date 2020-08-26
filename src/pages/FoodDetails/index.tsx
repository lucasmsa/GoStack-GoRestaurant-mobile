import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import {
  Container,
  Header,
  ScrollContainer,
  FoodsContainer,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
  AdditionalsContainer,
  Title,
  TotalContainer,
  AdittionalItem,
  AdittionalItemText,
  AdittionalQuantity,
  PriceButtonContainer,
  TotalPrice,
  QuantityContainer,
  FinishOrderButton,
  ButtonText,
  IconContainer,
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

interface Food {
  id: number;
  name: string;
  description: string;
  category: number;
  price: number;
  image_url: string;
  formattedPrice: string;
  thumbnail_url: string;
  extras: Extra[];
}

const FoodDetails: React.FC = () => {
  const [food, setFood] = useState({} as Food);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [foodQuantity, setFoodQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadFood(): Promise<void> {
      await api.get(`foods/${routeParams.id}`).then(response => {
        let extrasValues = response.data.extras as Partial<Extra[]>;

        extrasValues = extrasValues.map(extra =>
          Object.assign(extra, { quantity: 0 }),
        );

        setExtras(extrasValues as Extra[]);
        setFood(response.data);
      });
    }

    loadFood();
  }, [routeParams]);

  function handleIncrementExtra(id: number): void {
    const updatedExtras = [...extras];
    const incrementIndex = updatedExtras.findIndex(extra => extra.id === id);
    updatedExtras[incrementIndex].quantity += 1;
    setExtras(updatedExtras);
  }

  function handleDecrementExtra(id: number): void {
    const updatedExtras = [...extras];
    const decrementIndex = updatedExtras.findIndex(extra => extra.id === id);

    if (updatedExtras[decrementIndex].quantity > 0) {
      updatedExtras[decrementIndex].quantity -= 1;
    }

    setExtras(updatedExtras);
  }

  function handleIncrementFood(): void {
    setFoodQuantity(state => (state += 1));
  }

  function handleDecrementFood(): void {
    foodQuantity > 1 && setFoodQuantity(state => (state -= 1));
  }

  const toggleFavorite = useCallback(async () => {
    setIsFavorite(!isFavorite);
    const foodFavorite = food;
    delete foodFavorite.extras;

    !isFavorite
      ? api.post(`favorites`, {
          ...foodFavorite,
        })
      : api.delete(`favorites/${foodFavorite.id}`);
  }, [isFavorite, food]);

  const cartTotal = useMemo(() => {
    const extrasValue = extras.reduce(
      (accumulator, extra) =>
        accumulator +
        (extra.quantity ? Number(extra.quantity) * Number(extra.value) : 0),
      0,
    );
    const food_price = food.price;

    const cartValue = (Number(food_price) + extrasValue) * foodQuantity;

    return cartValue;
  }, [foodQuantity, extras, food]);

  async function handleFinishOrder(): Promise<void> {
    const { id, name, description, price, category, thumbnail_url } = {
      ...food,
    };

    const orderWithExtras = {};

    Object.assign(orderWithExtras, {
      product_id: id,
      name,
      description,
      price,
      quantity: foodQuantity,
      category,
      thumbnail_url,
      extras: [...extras],
    });

    await api.post('orders', orderWithExtras).then(() => {
      navigation.navigate('MainBottom');
    });
  }

  const favoriteIconName = useMemo(
    () => (isFavorite ? 'favorite' : 'favorite-border'),
    [isFavorite],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcon
          name={favoriteIconName}
          size={24}
          color="#FFB84D"
          onPress={() => toggleFavorite()}
        />
      ),
    });
  }, [navigation, favoriteIconName, toggleFavorite]);

  return (
    <Container>
      <Header />

      <ScrollContainer>
        <FoodsContainer>
          <Food>
            <FoodImageContainer>
              <Image
                style={{ width: 327, height: 183 }}
                source={{
                  uri: food.image_url,
                }}
              />
            </FoodImageContainer>
            <FoodContent>
              <FoodTitle>{food.name}</FoodTitle>
              <FoodDescription>{food.description}</FoodDescription>
              <FoodPricing>{formatValue(food.price)}</FoodPricing>
            </FoodContent>
          </Food>
        </FoodsContainer>
        <AdditionalsContainer>
          <Title>Adicionais</Title>
          {extras.map(extra => (
            <AdittionalItem key={extra.id}>
              <AdittionalItemText>{extra.name}</AdittionalItemText>
              <AdittionalQuantity>
                <Icon
                  size={15}
                  color="#6C6C80"
                  name="minus"
                  onPress={() => handleDecrementExtra(extra.id)}
                  testID={`decrement-extra-${extra.id}`}
                />
                <AdittionalItemText testID={`extra-quantity-${extra.id}`}>
                  {extra.quantity}
                </AdittionalItemText>
                <Icon
                  size={15}
                  color="#6C6C80"
                  name="plus"
                  onPress={() => handleIncrementExtra(extra.id)}
                  testID={`increment-extra-${extra.id}`}
                />
              </AdittionalQuantity>
            </AdittionalItem>
          ))}
        </AdditionalsContainer>
        <TotalContainer>
          <Title>Total do pedido</Title>
          <PriceButtonContainer>
            <TotalPrice testID="cart-total">
              {formatValue(cartTotal)}
            </TotalPrice>
            <QuantityContainer>
              <Icon
                size={15}
                color="#6C6C80"
                name="minus"
                onPress={handleDecrementFood}
                testID="decrement-food"
              />
              <AdittionalItemText testID="food-quantity">
                {foodQuantity}
              </AdittionalItemText>
              <Icon
                size={15}
                color="#6C6C80"
                name="plus"
                onPress={handleIncrementFood}
                testID="increment-food"
              />
            </QuantityContainer>
          </PriceButtonContainer>

          <FinishOrderButton onPress={() => handleFinishOrder()}>
            <ButtonText>Confirmar pedido</ButtonText>
            <IconContainer>
              <Icon name="check-square" size={24} color="#fff" />
            </IconContainer>
          </FinishOrderButton>
        </TotalContainer>
      </ScrollContainer>
    </Container>
  );
};

export default FoodDetails;
