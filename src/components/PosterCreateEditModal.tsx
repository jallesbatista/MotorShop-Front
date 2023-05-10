import {
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
  Heading,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage,
  Button,
  Text,
  Box,
  List,
  ListItem,
  InputLeftAddon,
  HStack,
  useRadioGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { useController, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiTrash } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { brlCurrencyMask } from "@/functions/masks";
import { IPosterGet, TCreatePoster } from "@/interfaces/poster.interfaces";
import { editPosterSchema } from "@/schemas";
import { posterContext } from "@/contexts/PosterContext";
import CustomRadioButton from "./CustomRadioButton";
import DeleteModal from "./DeleteModal";

interface IPosterCreateEditModal {
  isOpen: boolean;
  onClose: () => void;
  onSucessModalOpen?: () => void;
  setPosters: React.Dispatch<React.SetStateAction<IPosterGet[]>>;
  poster?: IPosterGet | null;
  edit?: boolean;
}

interface iCar {
  id: string;
  name: string;
  brand: string;
  year: string;
  fuel: number;
  value: number;
}

const PosterCreateEditModal = ({
  isOpen,
  onClose,
  onSucessModalOpen,
  setPosters,
  edit,
  poster,
}: IPosterCreateEditModal) => {
  const [brandSearch, setBrandSearch] = useState<string>("");
  const [brandArray, setBrandArray] = useState<string[]>([]);
  const [brandFilterArray, setBrandFilterArray] = useState<string[]>([]);

  const [modelSearch, setModelSearch] = useState("");
  const [modelArray, setModelArray] = useState<string[]>([]);
  const [modelFilterArray, setModelFilterArray] = useState<string[]>([]);

  const [carArray, setCarArray] = useState<iCar[]>([]);
  const [carBrandModel, setCarBrandModel] = useState("");

  const { posterCreate, posterEdit, posterDelete } = posterContext();

  const {
    isOpen: isConfirmDeleteOpen,
    onOpen: onConfirmDeleteOpen,
    onClose: onConfirmDeleteClose,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TCreatePoster>({
    resolver: zodResolver(editPosterSchema),
    defaultValues: {
      images: [{ image: null }, { image: null }, { image: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const [radioState, setRadioState] = useState<"y" | "n">("n");

  const radioOptions = ["y", "n"];
  const radioOptionsName = ["Sim", "Não"];

  const { field: radioField } = useController({
    control: control,
    name: "publish_option",
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    ...radioField,
    onChange: (e: any) => {
      radioField.onChange(e);
      setRadioState(e);
    },
    value: radioState,
  });

  const group = getRootProps();

  useEffect(() => {
    if (edit && poster) {
      const getImages = async () => {
        try {
          const images = await Promise.all(
            poster.images.map((el) => {
              return fetch(el.url);
            })
          ).then((values) => values.map((val) => val.blob()));
        } catch (error) {
          console.log(error);
        }
      };
      getImages();

      reset({
        color: poster.color,
        kilometers: poster.kilometers,
        price: poster.price
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 2,
          })
          .split(/\s/g)[1],
        description: poster.description,
        // images: poster.images,
      });
      setBrandSearch(poster.brand);
      setRadioState(poster.is_published ? "y" : "n");
    }
  }, [edit]);

  useEffect(() => {
    const getAllCars = async () => {
      try {
        const response = await fetch("https://kenzie-kars.herokuapp.com/cars/");
        const data = await response.json();

        setBrandArray(Object.keys(data));
      } catch (error: any) {
        console.log(error.data.message);
      }
    };
    getAllCars();
  }, []);

  useEffect(() => {
    const getCarModel = async () => {
      if (
        carBrandModel &&
        brandSearch &&
        !brandFilterArray.length &&
        brandArray.includes(brandSearch) &&
        brandSearch !== carBrandModel
      ) {
        setModelSearch("");
        reset({
          year: "",
          fuel_type: "",
          fipe_price: "",
        });
      }

      if (brandSearch && !brandFilterArray.length && brandArray.includes(brandSearch)) {
        try {
          const response = await fetch(
            `https://kenzie-kars.herokuapp.com/cars?brand=${brandSearch}`
          );
          const data: iCar[] = await response.json();

          setCarArray(data);
          setModelArray(
            data.map((car, index) => {
              if (index == 0) {
                setCarBrandModel(car.brand);
              }
              return car.name;
            })
          );

          if (!data.length) {
            setBrandSearch("");
            reset({
              brand: "",
            });
          }

          if (edit && poster) {
            setModelSearch(poster.model);
          }
        } catch (error: any) {
          console.log(error.data.message);
        }
      } else if (
        !brandSearch ||
        (brandSearch && !brandFilterArray.length && !brandArray.includes(brandSearch))
      ) {
        setBrandSearch("");
        reset({
          brand: "",
        });
        setModelSearch("");
        reset({
          year: "",
          fuel_type: "",
          fipe_price: "",
        });
      }
    };

    getCarModel();
  }, [brandSearch]);

  useEffect(() => {
    const getCarData = () => {
      if (modelSearch && !modelFilterArray.length && modelArray.includes(modelSearch)) {
        const car = carArray.find((car) => car.name == modelSearch);
        const fuelType = ["flex", "híbrido", "elétrico"];

        reset({
          year: car!.year,
          fuel_type: fuelType[car!.fuel - 1],
          fipe_price: car!.value
            .toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              maximumFractionDigits: 2,
            })
            .split(/\s/g)[1],
          is_published: poster?.is_published,
        });
      } else if (modelSearch && !modelFilterArray.length && !modelArray.includes(modelSearch)) {
        setModelSearch("");
        reset({
          year: "",
          fuel_type: "",
          fipe_price: "",
        });
      }
    };

    getCarData();
  }, [modelSearch]);

  const handleBrandSearch = (value: string) => {
    setBrandSearch(value);
    if (value) {
      setBrandFilterArray(brandArray.filter((brand) => brand.includes(value.toLowerCase())));
    } else {
      setBrandFilterArray([]);
    }
  };

  const handleModelSearch = (value: string) => {
    setModelSearch(value);
    if (value) {
      setModelFilterArray(modelArray.filter((model) => model.includes(value.toLowerCase())));
    } else {
      setModelFilterArray([]);
    }
  };

  const closeAndReset = () => {
    onClose();
    setBrandSearch("");
    reset({
      brand: "",
      color: "",
      description: "",
      fipe_price: "",
      fuel_type: "",
      kilometers: "",
      model: "",
      year: "",
      price: "",
      images: [{ image: null }, { image: null }, { image: null }],
    });
  };

  const deleteFunction = async () => {
    if (edit && poster) {
      const deleted = await posterDelete(poster.id);
      if (deleted) {
        setPosters((old) => old.filter((el) => el.id !== poster.id));
        onConfirmDeleteClose();
        closeAndReset();
      }
    }
  };

  const onSubmit = async (data: TCreatePoster) => {
    if (!edit) {
      console.log(data);
      const createdPoster = await posterCreate(data);
      if (createdPoster) {
        setPosters((old) => [createdPoster, ...old]);
        onSucessModalOpen!();
      }
    } else {
      if (poster) {
        const updatedPoster = await posterEdit(poster.id, data);
        if (updatedPoster) {
          setPosters((old) =>
            old.map((el) => {
              if (el.id == updatedPoster.id) {
                return updatedPoster;
              }
              return el;
            })
          );
        }
      }
    }
    // closeAndReset();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeAndReset} closeOnOverlayClick>
        <ModalOverlay w={"100%"} h={"100%"} />
        <ModalContent
          color={"grey.1"}
          as={"form"}
          onSubmit={handleSubmit(onSubmit)}
          background={"white"}
          rounded={"8px"}
          p={{ base: "18px 0px 32px 0px", md: "" }}
          w={"100%"}
          maxW={"520px"}
          display={"flex"}
          flexDirection={"column"}
          gap={"18px"}
        >
          <Flex w={"100%"} align={"center"} px={{ base: "16px", md: "24px" }} position={"relative"}>
            <Heading fontWeight={"semibold"} fontSize={"heading.7"}>
              {edit ? "Editar anúncio" : "Criar anúncio"}
            </Heading>
            <ModalCloseButton color={"grey.4"} top={"-5px"} right={{ base: "10px", md: "15px" }} />
          </Flex>
          <Flex direction={"column"} gap={"24px"} px={{ base: "24px", md: "30px" }}>
            <Text fontWeight={"semibold"} color={"black"} fontSize={"body.2"}>
              Informações do veículo
            </Text>

            <FormControl id="brand" isInvalid={!!errors.brand?.message} position={"relative"}>
              <FormLabel fontSize={"body.2"} fontWeight={"semibold"}>
                Marca
              </FormLabel>
              <Input
                value={brandSearch}
                {...register("brand", {
                  onChange(e: React.ChangeEvent<HTMLInputElement>) {
                    handleBrandSearch(e.target.value.trim());
                  },
                })}
                type="text"
                placeholder="Mercedes Benz"
                autoComplete={"off"}
                onBlur={() => {
                  if (brandFilterArray.length == 1 && brandFilterArray[0] == brandSearch) {
                    setBrandFilterArray([]);
                  }
                }}
              />

              {brandFilterArray.length != 0 && (
                <List
                  maxH={"160px"}
                  overflowY={"scroll"}
                  sx={{
                    "::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "::-webkit-scrollbar-track": {
                      width: "2px",
                    },
                    "::-webkit-scrollbar-thumb": {
                      background: "brand.3",
                      borderRadius: "24px",
                    },
                  }}
                  position={"absolute"}
                  w={"100%"}
                  right={0}
                  zIndex={"dropdown"}
                  bg={"sucess.3"}
                  rounded={"0px 0px 4px 4px"}
                  display={"flex"}
                  flexDirection={"column"}
                  boxShadow={"lg"}
                  color={"sucess.1"}
                >
                  {brandFilterArray.map((brand, index) => (
                    <ListItem
                      role="button"
                      _hover={{
                        bg: "brand.4",
                      }}
                      p={"8px 8px"}
                      key={index}
                      onClick={() => {
                        setBrandSearch(brand);
                        setBrandFilterArray([]);
                      }}
                    >
                      <Text fontSize={"body.1"} fontWeight={"bold"}>
                        {brand}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              )}
              <FormErrorMessage>{errors.brand?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="model" isInvalid={!!errors.model?.message} position={"relative"}>
              <FormLabel fontSize={"body.2"} fontWeight={"semibold"}>
                Modelo
              </FormLabel>
              <Input
                {...register("model", {
                  onChange(e: React.ChangeEvent<HTMLInputElement>) {
                    handleModelSearch(e.target.value);
                  },
                })}
                autoComplete={"off"}
                onBlur={() => {
                  if (modelFilterArray.length == 1 && modelFilterArray[0] == modelSearch) {
                    setModelFilterArray([]);
                  }
                }}
                value={modelSearch}
                type="text"
                placeholder="A 200 CGI ADVANCE SEDAN"
              />
              <FormErrorMessage>{errors.model?.message}</FormErrorMessage>
              {modelFilterArray.length != 0 && (
                <List
                  maxH={"160px"}
                  overflowY={"scroll"}
                  sx={{
                    "::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "::-webkit-scrollbar-track": {
                      width: "2px",
                    },
                    "::-webkit-scrollbar-thumb": {
                      background: "brand.3",
                      borderRadius: "24px",
                    },
                  }}
                  position={"absolute"}
                  w={"100%"}
                  right={0}
                  zIndex={"dropdown"}
                  bg={"sucess.3"}
                  rounded={"0px 0px 4px 4px"}
                  display={"flex"}
                  flexDirection={"column"}
                  boxShadow={"lg"}
                  color={"sucess.1"}
                >
                  {modelFilterArray.map((model, index) => (
                    <ListItem
                      role="button"
                      _hover={{
                        bg: "brand.4",
                      }}
                      p={"8px 8px"}
                      key={index}
                      onClick={() => {
                        setModelSearch(model);
                        setModelFilterArray([]);
                      }}
                    >
                      <Text fontSize={"body.1"} fontWeight={"bold"}>
                        {model}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              )}
            </FormControl>
            <Flex gap={{ base: "12px", md: "16px" }}>
              <FormControl id="year">
                <FormLabel fontSize={"body.2"} fontWeight={"semibold"}>
                  Ano
                </FormLabel>
                <Input {...register("year")} readOnly type="text" placeholder="2018" />
              </FormControl>
              <FormControl id="fuel_type">
                <FormLabel fontSize={"body.2"} fontWeight={"semibold"}>
                  Combustível
                </FormLabel>
                <Input
                  {...register("fuel_type")}
                  readOnly
                  type="text"
                  placeholder="Gasolina / Etanol"
                />
              </FormControl>
            </Flex>
            <Flex gap={{ base: "12px", md: "16px" }}>
              <FormControl id="km" isInvalid={!!errors.kilometers?.message}>
                <FormLabel fontSize={"body.2"} fontWeight={"semibold"}>
                  Quilometragem
                </FormLabel>
                <Input
                  {...register("kilometers")}
                  autoComplete="off"
                  type="number"
                  min={0}
                  step={"1"}
                  placeholder="30.000"
                />
                <FormErrorMessage>{errors.kilometers?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="color" isInvalid={!!errors.color?.message}>
                <FormLabel fontSize={"body.2"} fontWeight={"semibold"}>
                  Cor
                </FormLabel>
                <Input {...register("color")} type="text" placeholder="Branco" />
                <FormErrorMessage>{errors.color?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex gap={{ base: "12px", md: "16px" }}>
              <FormControl id="fipe_price">
                <FormLabel fontSize={"body.2"} fontWeight={"semibold"}>
                  Preço tabela FIPE
                </FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    bg={"grey.8"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    h={"48px"}
                    p={"0px 8px"}
                    color={"grey.3"}
                    children="R$"
                  />
                  <Input
                    {...register("fipe_price")}
                    readOnly
                    autoComplete="off"
                    paddingLeft={"8px"}
                    type="text"
                    placeholder="48.000,00"
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="price" isInvalid={!!errors.price?.message}>
                <FormLabel fontSize={"body.2"} fontWeight={"semibold"}>
                  Preço
                </FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    bg={"grey.8"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    h={"48px"}
                    p={"0px 8px"}
                    color={"grey.3"}
                    children="R$"
                  />
                  <Input
                    {...register("price", {
                      onChange(e: React.ChangeEvent<HTMLInputElement>) {
                        brlCurrencyMask(e);
                      },
                    })}
                    paddingLeft={"8px"}
                    autoComplete="off"
                    type="text"
                    placeholder="50.000,00"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
              </FormControl>
            </Flex>

            <FormControl id="description" isInvalid={!!errors.description?.message}>
              <FormLabel fontSize={"body.2"} fontWeight={"semibold"}>
                Descrição
              </FormLabel>
              <Textarea
                {...register("description")}
                maxLength={500}
                placeholder="Descreva seu anúncio aqui"
              />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>

            {edit && poster && (
              <Flex direction={"column"} gap={"16px"}>
                <Text
                  w={"100%"}
                  textAlign={"left"}
                  fontWeight={"semibold"}
                  color={"black"}
                  fontSize={"body.2"}
                >
                  Publicado
                </Text>
                <HStack w={"100%"} {...group}>
                  {radioOptions.map((value, index) => {
                    const radio = { ...getRadioProps({ value }) };
                    return (
                      <CustomRadioButton key={value} {...radio}>
                        {radioOptionsName[index]}
                      </CustomRadioButton>
                    );
                  })}
                </HStack>
              </Flex>
            )}

            {fields.map((field, index) => (
              <FormControl
                id={`img${index}`}
                key={field.id}
                isInvalid={!!errors.images?.[index]?.image?.message}
              >
                <FormLabel fontSize={"body.2"} fontWeight={"semibold"}>
                  {!index ? "Imagem da capa" : `${index}º Imagem da galeria`}
                </FormLabel>
                <InputGroup>
                  <Input
                    type="file"
                    accept="image/*"
                    {...register(`images.${index}.image`)}
                    variant={"file"}
                  />
                  <InputRightElement>
                    <IconButton
                      bg="alert.3"
                      color="alert.1"
                      _hover={{ bg: "alert.2" }}
                      aria-label="trash"
                      fontSize={"heading.5"}
                      onClick={() => remove(index)}
                      isDisabled={fields.length < 4}
                      icon={<FiTrash />}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {String(errors.images?.[index]?.image?.message)}
                </FormErrorMessage>
              </FormControl>
            ))}

            <Box>
              <Button
                onClick={() => append({ image: null })}
                w={"100%"}
                maxW={"max-content"}
                variant={"brandOpacity"}
                isDisabled={fields.length >= 6}
              >
                <Text maxW={"100%"} overflow={"hidden"} textOverflow={"ellipsis"}>
                  Adicionar campo para imagem da galeria
                </Text>
              </Button>
            </Box>
            {edit ? (
              <Flex mt={{ base: "12px", md: "18px" }} gap={"10px"}>
                <Button
                  onClick={onConfirmDeleteOpen}
                  w={{ base: "50%", md: "60%" }}
                  size={"lg"}
                  variant={"negative"}
                >
                  Excluir anúncio
                </Button>
                <Button
                  type="submit"
                  w={{ base: "50%", md: "40%" }}
                  size={"lg"}
                  variant={"brandDisable"}
                  minW={"138px"}
                >
                  Salvar alterações
                </Button>
              </Flex>
            ) : (
              <Flex mt={{ base: "12px", md: "18px" }} gap={"10px"} justify={"flex-end"}>
                <Button onClick={onClose} w={"50%"} maxW={"130px"} size={"lg"} variant={"negative"}>
                  Cancelar
                </Button>
                <Button type="submit" w={"50%"} maxW={"190px"} size={"lg"} variant={"brandDisable"}>
                  Criar anúncio
                </Button>
              </Flex>
            )}
          </Flex>
        </ModalContent>
      </Modal>

      <DeleteModal
        isOpen={isConfirmDeleteOpen}
        onClose={onConfirmDeleteClose}
        deleteFunction={deleteFunction}
        headingText="Excluir anúncio"
        title="Tem certeza que deseja excluir esse anúncio?"
        description="Essa ação não pode ser desfeita. Isso excluirá permanentemente seu anúncio."
        buttonText="Sim, excluir meu anúncio"
      />
    </>
  );
};

export default PosterCreateEditModal;
