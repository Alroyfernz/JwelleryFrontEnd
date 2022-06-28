import React, { useState } from "react";
import MyaccLayout from "../../Layout/MyaccLayout";
import styles from "../../styles/myaccount/Address.module.scss";
import { useFormik, Formik } from "formik";
import Image from "next/image";
import { useMutation, useQuery } from "react-query";
import { BACKEND_API } from "../../cred";
import { useSelector } from "react-redux";
import SpinnerLoader from "../../components/Spinner";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function Address() {
  const user = useSelector((state) => state.user.userData);
  const id = user?.savedUser?._id;
  const toast = useToast();
  const [editingData, setEditingData] = useState({});
  const [edit, setEdit] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery("addresses", () =>
    axios.get(`${BACKEND_API}/useraddresses/${id}`)
  );

  if (isLoading) {
    return <SpinnerLoader />;
  }

  const { addresses } = data?.data;

  return (
    <MyaccLayout>
      <main className={styles.Address}>
        <h1>Address</h1>
        {!edit && (
          <section className={styles.AddressCards}>
            {addresses.map((a) => (
              <Card
                key={a._id}
                data={a}
                toast={toast}
                setEdit={setEdit}
                refetch={refetch}
                setEditingData={setEditingData}
              />
            ))}
          </section>
        )}
        <span>+ add New Address</span>
        <AddressForm data={editingData} isEditing={edit} />
      </main>
    </MyaccLayout>
  );
}

const Card = ({ data, toast, refetch, setEditingData, setEdit }) => {
  const {
    _id,
    address,
    alContactNo,
    city,
    contactNo,
    country,
    locality,
    name,
    pin,
    state,
  } = data;

  const { mutate, isLoading } = useMutation(
    () => axios.delete(`${BACKEND_API}/address/${_id}`),
    {
      onSuccess: () => {
        toast({
          title: "Delete Address",
          description: "Address deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        refetch();
      },
    }
  );

  return (
    <div className={styles.Card}>
      <div className={styles.CardTop}>
        <input type="checkbox" />
      </div>
      <span className={styles.CardName}>{name}</span>
      <span className={styles.CardPhone}>
        <span className={styles.CardPhoneR}>{contactNo}</span>
        <span className={styles.CardPhoneAl}>/ {alContactNo}</span>
      </span>
      <span className={styles.CardAdd}>{address}</span>
      <span className={styles.CardPin}>{pin} </span>
      <div className={styles.CardButtons}>
        <button
          onClick={() => {
            setEditingData(data);
            setEdit(true);
          }}
        >
          <Image
            height="15px"
            width="15px"
            src="/myaccount/edit.svg"
            alt="edit"
          />
          Edit
        </button>
        <button onClick={() => mutate()} disabled={isLoading}>
          <Image
            height="15px"
            width="15px"
            src="/myaccount/edit.svg"
            alt="edit"
          />
          Delete
        </button>
      </div>
    </div>
  );
};

const AddressForm = ({ data, isEditing }) => {
  console.log("data", data);
  const { mutate: editAddress, isLoading: editingAddress } = useMutation(() =>
    axios.put(`${BACKEND_API}/`)
  );

  const { mutate: addAddress, isLoading: addingAddress } = useMutation(() =>
    axios.put(`${BACKEND_API}/`)
  );

  const { handleSubmit, handleReset, values, handleChange, initialValues } =
    useFormik({
      initialValues: data,
      enableReinitialize: true,
      onSubmit: (values) => {
        if (isEditing) {
          editAddress(values);
        } else {
          addAddress(values);
        }
      },
    });

  console.log("initialValues", initialValues);

  const {
    address,
    alContactNo,
    city,
    contactNo,
    country,
    locality,
    name,
    pin,
    state,
    user,
  } = values;

  return (
    <form onSubmit={handleSubmit} className={styles.AddressForm}>
      {console.log("values", values)}
      <div>
        <label htmlFor="name">Name</label>
        <input
          className={styles.Name}
          name="name"
          id="name"
          value={values?.name}
          defaultValue={values?.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <textarea
          rows={3}
          id="address"
          name="address"
          value={address}
          defaultValue={address}
          onChange={handleChange}
        />
      </div>
      <div className={styles.AddressFormBelowArea}>
        <div>
          <label htmlFor="locality">Locality</label>
          <input
            id="locality"
            name="locality"
            value={locality}
            defaultValue={locality}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pin">Pin code</label>
          <input
            id="pin"
            name="pin"
            value={pin}
            defaultValue={pin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            value={city}
            defaultValue={city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input
            id="state"
            name="state"
            value={state}
            defaultValue={state}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            value={country}
            defaultValue={country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="contactNo">Contact No.</label>
          <input
            id="contactNo"
            name="contactNo"
            value={contactNo}
            defaultValue={contactNo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="alContactNo">Alternative Contact No.</label>
          <input
            id="alContactNo"
            name="alContactNo"
            value={alContactNo}
            defaultValue={alContactNo}
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        disabled={
          editingAddress ? editingAddress : addingAddress && addingAddress
        }
        type="submit"
      >
        Save
      </button>
    </form>
  );
};
