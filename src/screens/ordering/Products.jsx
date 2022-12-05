import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Card, SearchBar, Text, Button, makeStyles } from "@rneui/themed";
import { FlatList, View } from "react-native";
import { OrderingContext, useOrdering, useOrderingDispatch } from "../../context/OrderingState";
import { useQuery } from "react-query";
import { BarcitoAPI } from "../../api/BarcitoAPI";
import BarcitoImageBackground from "../../components/BarcitoImageBackground";
import ProductCard from "../../components/ProductCard";
import LoadingScreen from "../../components/LoadingScreen";

const Products = () => {
    const { barcito } = useOrdering();
    const { onAdd, onUpdate, onRemove, onRemoveAll, isPresent } = useOrderingDispatch();
    const { params } = useRoute();
    const { data: prodList, isLoading } = useQuery(['products'], async () => BarcitoAPI.getProductsByCategory(barcito.id, params.categoryId) );
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    const styles = useStyles();

    const updateSearch = (searchValue) => {
        setSearch(searchValue);
    }

    const handleOnAdd = (product) => {
        onAdd({ ...product, quantity: 1 });
    }

    const handleOnUpdate = (productId) => {
        onUpdate(productId);
    }

    const handleOnRemove = (productId) => {
        onRemove(productId);
    }

    const handleOnRemoveAll = (productId) => {
        onRemoveAll(productId);
    }

    if(isLoading){
        return <LoadingScreen />;
    }

    const productList = search === '' ? prodList : prodList.filter((prod) => prod.description.toLowerCase().includes(search.toLowerCase()));

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Buscar producto"
                onChangeText={updateSearch}
                value={search}
                round={true}
                containerStyle={styles.searchBarContainer}
                inputStyle={styles.searchInput}
                cursorColor={styles.searchCursor}
            />
            <View style={styles.categoryLabel}>
                <Text style={styles.categoryLabelText}>Categoria '{params.categoryName}'</Text>
                <Button onPress={() => navigation.navigate('Home', { screen: 'Categories' })} title="Cambiar" />
            </View>
            <FlatList
                data={productList}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'center'
                }}
                renderItem={({ item }) => {
                    const prodOnCart = isPresent(item.id);
                    return(
                        <ProductCard
                            prodOnCart={prodOnCart}
                            product={item}
                            handleOnAdd={handleOnAdd}
                            handleOnRemove={handleOnRemove}
                            handleOnRemoveAll={handleOnRemoveAll}
                            handleOnUpdate={handleOnUpdate}
                        />
                    );
                }}
                keyExtractor={(prod) => prod.id}
            />
        </View>
    );
};

const useStyles = makeStyles((theme) => ({
    searchBarContainer: {
        backgroundColor: theme.colors.backgroundVariant
    },
    searchInput: {
        color: theme.colors.onBackground
    },
    searchCursor: theme.colors.primary,
    container: {
        height: '100%',
        backgroundColor: theme.colors.background
    },
    categoryLabel: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    categoryLabelText: {
        color: theme.colors.onBackground,
        marginRight: 10,
        fontSize: 25,
        fontWeight: 'bold'
    }
}));

export default Products;