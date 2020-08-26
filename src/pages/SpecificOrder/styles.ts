import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #f0f0f5;
`;

export const Header = styled.View`
  padding: 40px 24px 20px;
  background: #c72828;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GoBackButton = styled.TouchableOpacity`
  padding: 24px 18px 14px;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 40,
  },
})`
  margin-top: -40px;
`;

export const FoodsContainer = styled.View`
  padding: 0 24px;
`;

export const Food = styled.View`
  display: flex;
  flex-direction: column;
  background: #f0f0f5;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const FoodImageContainer = styled.View`
  background: #ffb84d;
  border-radius: 100px;
  align-items: center;
  margin: 36px;
  padding: 20px;
`;

export const FoodContent = styled.View`
  padding: 24px;
  width: 90%;
  align-self: center;
  align-items: center;
`;

export const FoodTitle = styled.Text`
  font-family: 'Poppins-Regular';
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #3d3d4d;
`;

export const FoodDescription = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 25px;
  margin-top: 8px;
  color: #3d3d4d;
`;

export const FoodPricing = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  color: #6c6c80;
  margin-top: 8px;
  font-weight: 600;
`;

export const FoodIngredientsTitle = styled.Text`
  font-family: 'Poppins-Regular';
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #3d3d4d;
  svg {
    padding-left: 20px;
  }
`;

export const FoodIngredients = styled.View``;

export const FoodIngredientsTop = styled.View`
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  align-content: center;
`;

export const FoodIngredientsIcon = styled.View`
  padding-left: 10px;
`;

export const FoodQuantity = styled.Text`
  margin: 36px 0 18px;
  font-family: 'Poppins-Regular';
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #3d3d4d;
`;

export const FoodIngredientsIndividually = styled.Text`
  flex: 1;
  flex-direction: column;
`;

export const FoodIngredientsBottom = styled.View`
  align-items: center;
`;

export const FoodIngredientExtra = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 25px;
  margin-top: 8px;
  color: #3d3d4d;
`;
