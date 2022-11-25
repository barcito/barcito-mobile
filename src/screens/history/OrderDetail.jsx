import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native"
import { useQuery } from "react-query";
import { UserAPI } from "../../api/UserAPI";

const OrderDetail = () => {

    const { params } = useRoute();
    const { data, isLoading } = useQuery(['order'], async () => UserAPI.getOrder(params.orderCode));

    if(isLoading){
        return <View><Text>Is loading</Text></View>;
    }

    console.log(data.products);

    return (
        <View>
            <Text>{data.code}</Text>
        </View>
    );
}

export default OrderDetail;