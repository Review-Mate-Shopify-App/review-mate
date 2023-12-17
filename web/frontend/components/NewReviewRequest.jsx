import { LegacyCard, Autocomplete, Icon, Button } from "@shopify/polaris";
import { useState, useCallback } from "react";
import Input from "../components/shared/Input";
import { SearchMinor } from "@shopify/polaris-icons";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export default function NewReviewRequest({
  isOpen,
  setIsOpen,
  refetchReviews,
  selectedProduct,
}) {
  const fetch = useAuthenticatedFetch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [creatingRequest, setCreatingRequest] = useState(false);
  const [options, setOptions] = useState();

  //Fetch Products
  const { data: products, isLoading: isLoading } = useAppQuery({
    url: "/api/products/",
    reactQueryOptions: {
      onSuccess: ({ data: productsData }) => {
        if (selectedProduct) {
          setSelectedOptions(selectedProduct);
        }
        setOptions(
          productsData.map((product) => {
            return { value: product.id, label: product.title };
          })
        );
      },
    },
  });

  const updateText = useCallback((value) => {
    setInputValue(value);

    if (value === "") {
      setOptions(
        products &&
          products.data &&
          products.data.map((product) => {
            return { value: product.title, label: product.title };
          })
      );
      return;
    }
  }, []);

  const updateSelection = useCallback(
    (selected) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return selectedItem === option.value;
        });
        setInputValue(matchedOption.label || "");
        setSelectedOptions([matchedOption.value, matchedOption.label]);
        return matchedOption && matchedOption.value;
      });
    },
    [options]
  );

  const handleSendReviewRequest = async () => {
    setCreatingRequest(true);
    const response = await fetch(
      `/api/review/create?name=${name}&email=${email}&productId=${selectedOptions[0]}&productName=${selectedOptions[1]}`
    );

    if (response.ok) {
      setName("");
      setEmail("");
      setInputValue("");
      setSelectedOptions([]);
      setCreatingRequest(false);
      setIsOpen(false);
      if (refetchReviews) {
        await refetchReviews();
      }
    }
  };

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label={
        <label style={{ fontWeight: "bold", fontSize: "14px" }}>
          Select Product
        </label>
      }
      value={inputValue}
      prefix={<Icon source={SearchMinor} tone="base" />}
      placeholder="Search"
      autoComplete="off"
    />
  );
  return (
    <LegacyCard sectioned>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
          padding: 20,
          width: "450px",
        }}
      >
        <Input
          value={name}
          label={"Customer Name"}
          autoComplete={"off"}
          onChange={(e) => setName(e)}
        />
        <Input
          value={email}
          type="email"
          label="Customer email"
          onChange={(e) => setEmail(e)}
          autoComplete="email"
        />
        {!isLoading && !selectedProduct && (
          <Autocomplete
            options={options}
            selected={selectedOptions}
            onSelect={updateSelection}
            textField={textField}
          />
        )}
        {selectedProduct && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontWeight: "bold", fontSize: "medium" }}>
              Selected Product:
            </span>
            <span style={{ fontSize: "16px" }}>{selectedProduct[1]}</span>
          </div>
        )}
        <div style={{ display: "flex", gap: 10, paddingTop: 20 }}>
          <Button
            variant="tertiary"
            loading={creatingRequest}
            disabled={creatingRequest}
            onClick={handleSendReviewRequest}
          >
            Send
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </LegacyCard>
  );
}
