import { Request } from "express";
import { Address } from "../../db/models";

// For getting an adress
const getAddress = async ({ addressId }: any, _: Request) => {
  const address = await Address.findById(addressId);
  return {
    ...address._doc,
    _id: address._id.toString(),
  };
};

// For getting all adresses
const getAddresses = async (context: any, _: Request) => {
  const result = await Address.find({});
  const address = result.map((ad: any) => ({
    _id: ad._id.toString(),
    ...ad._doc,
  }));
  return address;
};

// For creating a new new address
const createAddress = async (
  { address: { phone, city, address, userId } }: any,
  _: Request
) => {
  const result = new Address({
    address,
    city,
    phone,
    userId,
  });
  const newAddress = await result.save();
  return {
    ...newAddress._doc,
    _id: newAddress._id,
  };
};
// For creating a new new address
const updateAddress = async (
  { addressId, address: { phone, city, userId } }: any,
  _: Request
) => {
  const address = await Address.findById(addressId);
  if (phone) {
    address.phone = phone;
  }
  if (city) {
    address.city = city;
  }
  if (userId) {
    address.userId = userId;
  }
  const newAddress = await address.save();
  return {
    ...newAddress._doc,
    _id: newAddress._id,
  };
};

const deleteAddress = async ({ addressId }: any, _: Request) => {
  const address = await Address.findById(addressId);
  address.isDeleted = true;
  return {
    ...address._doc,
    _id: address._id.toString(),
  };
};

export {
  createAddress,
  deleteAddress,
  updateAddress,
  getAddress,
  getAddresses,
};
