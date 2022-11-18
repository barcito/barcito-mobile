import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const Welcome = () => {

    const navigation = useNavigation();

    return(
        <Onboarding
            onDone={() => navigation.navigate('Auth', { screen: 'Register' })}
            onSkip={() => navigation.navigate('Auth', { screen: 'Register' })}
            imageContainerStyles={{  }}
            pages={[
            {
                backgroundColor: '#fff',
                image: <Image />,
                title: 'Onboarding',
                subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
                backgroundColor: '#fe6e58',
                image: <Image />,
                title: 'The Title',
                subtitle: 'This is the subtitle that sumplements the title.',
            },
            {
                backgroundColor: '#999',
                image: <Image />,
                title: 'Triangle',
                subtitle: "Beautiful, isn't it?",
            },
            ]}
        />
    );
}

export default Welcome;