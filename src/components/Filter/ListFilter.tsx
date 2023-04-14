import { mockedPoster } from "@/mocks";
import TextFilter from "./TextFilter"
import { Flex } from "@chakra-ui/layout";

const Filter = () => {
    const brandList = [...new Set(mockedPoster.map((el) => el.brand)];
    const modelList = [...new Set(mockedPoster.map((el) => el.model)];
    const colorList = [...new Set(mockedPoster.map((el) => el.color)];
    const yearList = [...new Set(mockedPoster.map((el) => el.year)];
    const fuelList = [...new Set(mockedPoster.map((el) => el.fuel_type)];

    return (
        <>
            <Flex direction={"column"}>
                <TextFilter filterList={brandList}>Brand</TextFilter>
                <TextFilter filterList={modelList}>Model</TextFilter>
                <TextFilter filterList={colorList}>Color</TextFilter>
                <TextFilter filterList={yearList}>Year</TextFilter>
                <TextFilter filterList={fuelList}>Fuel</TextFilter>
            </Flex>
        </>
    );
};

export default Filter;