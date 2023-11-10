import { Profile } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const getAllProfiles = async (): Promise<Profile[] | any> => {
  const result = await prisma.profile.findMany();
  const total = await prisma.profile.count();
  return {
    meta: {
      total,
    },
    data: result,
  };
};

const getSingleprofile = async (id: string): Promise<Profile | null> => {
  const result = await prisma.profile.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateprofile = async (
  id: string,
  profile: Profile
): Promise<Profile> => {
  const result = await prisma.profile.update({
    where: {
      id: id,
    },
    data: profile,
  });
  return result;
};

const deleteProfile = async (id: string): Promise<Profile> => {
  const result = await prisma.profile.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const ProfileService = {
  getAllProfiles,
  getSingleprofile,
  updateprofile,
  deleteProfile,
};
