import { Button } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../../api/authApi";
import useUserStore from "../../../store/user.zustand";

const ProfileSetting = () => {
  const navigate = useNavigate();
  const { signOut: clientSignOut } = useUserStore();
  const { uid } = useUserStore();
  const { mutate: signOut } = useMutation({
    mutationFn: () => authApi.signOut(),
    onSuccess: () => {
      clientSignOut();
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <div>
      {!!uid && (
        <Button onClick={() => signOut()} variant="outline">
          Sign out
        </Button>
      )}
    </div>
  );
};

export default ProfileSetting;
