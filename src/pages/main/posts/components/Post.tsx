import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import {
  ChatIcon,
  ChevronDownIcon,
  CloseIcon,
  CopyIcon,
  DeleteIcon,
  EditIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { USER_PROFILE_IMAGE_ROUTE } from "../../../../common/routes";
import { ThemeColor } from "../../../../common/styles/theme.style";
import { Input, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import CommentList from "./commentList";

import { useDisclosure } from "@chakra-ui/hooks";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CommentCreate from "./commentCreate";
import { useForm } from "react-hook-form";
import { QueryPostDto, UpdatePostDto } from "../../../../api/dtos/post.dto";
import { QueryCommentDto } from "../../../../api/dtos/comment.dto";
import postApi from "../../../../api/postApi";

interface PostProp {
  post: QueryPostDto;
}
const Post = ({ post }: PostProp) => {
  const { register, handleSubmit, reset, watch } = useForm<FormData>();

  type FormData = {
    text: string;
    image: FileList;
  };

  //open/close comment window functions
  const { getDisclosureProps, getButtonProps, onClose } = useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  //call comment data from api(임시)
  const [comments, setComments] = useState<QueryCommentDto[]>([]);

  // post의 refeching을 위해서 useQueryClient 객체 생성
  const queryClient = useQueryClient();
  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useMutation(
    async () => postApi.deletePost(post.id),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    }
  );

  // make use state for edit rep
  const [isEdited, setEdited] = useState(false);

  const { mutate, isLoading } = useMutation(
    async (post: QueryPostDto) =>
      postApi.updatePost({
        id: post.id,
        author: post.author,
        content: post.content,
      }),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: ["posts", post.author] });
        console.log("query reload");
        setEdited(false);
      },
    }
  );

  //이미지 미리보기
  const [imagePreview, setImagePreview] = useState<string[]>(
    post.images ? post.images : []
  );

  useEffect(() => {
    console.log("previewimage", imagePreview);
  }, [imagePreview]);

  const image = watch("image");
  const onLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    console.log("file", files);
    if (files) {
      let urlList: string[] = [];
      const fileList = Array.from(files);
      for (const url of fileList) {
        urlList.push(URL.createObjectURL(url));
      }
      setImagePreview(urlList);
    }
  };

  const editRep = async (data: FormData) => {
    if (data.text.length == 0) return alert("내용을 입력해주세요");
    // 기존 이미지에서 변경되지 않은 경우

    try {
      const editedPost: UpdatePostDto = {
        id: post.id,
        author: post.author,
        //images: imagePreview ? imagePreview : [],
        content: data.text,
      };
      await mutate(editedPost);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card
        bgColor={ThemeColor.backgroundColorDarker}
        color="white"
        fontSize="0.7em"
        margin="0.5em"
        marginBottom={"0em"}
      >
        <CardHeader>
          <Flex letterSpacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar
                name={rep.username}
                src={USER_PROFILE_IMAGE_ROUTE + rep.username + ".jpeg"}
              />
              <Box>
                <Heading fontSize="1.1em">{rep.username}</Heading>
                <Text fontSize={"0.9em"} color="gray.400">
                  {`${rep.updated_at}`.slice(0, 21)}
                </Text>
              </Box>
            </Flex>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    variant="unstyled"
                    isActive={isOpen}
                    as={Button}
                    color={ThemeColor.basicColor}
                    rightIcon={<ChevronDownIcon fontSize="2.2em" />}
                  />
                  <MenuList
                    fontSize={"1em"}
                    bgColor={ThemeColor.backgroundColorDarker}
                  >
                    <MenuItem
                      bgColor={ThemeColor.backgroundColorDarker}
                      _hover={{
                        bgColor: ThemeColor.backgroundColor,
                        color: "white",
                      }}
                    >
                      <CopyIcon />
                      &nbsp;Copy URL
                    </MenuItem>
                    <MenuItem
                      bgColor={ThemeColor.backgroundColorDarker}
                      color="yellow.400"
                      _hover={{ bgColor: "yellow.500", color: "white" }}
                      onClick={() => setEditRep(true)}
                    >
                      <EditIcon />
                      &nbsp;Edit
                    </MenuItem>
                    <MenuItem
                      bgColor={ThemeColor.backgroundColorDarker}
                      color="red.400"
                      onClick={() => deleteMutate()}
                      _hover={{ bgColor: "red.500", color: "white" }}
                    >
                      <DeleteIcon />
                      &nbsp;Delete
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </Flex>
        </CardHeader>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: ThemeColor.backgroundColor,
            borderLeft: `solid 0.5em ${ThemeColor.backgroundColorDarker}`,
            borderRight: `solid 0.5em ${ThemeColor.backgroundColorDarker}`,
          }}
        >
          {iseditRep && imagePreview.length > 0 ? (
            <>
              <Button onClick={() => setImagePreview([])}>
                <CloseIcon />
              </Button>
              <Image src={imagePreview[0]}></Image>
            </>
          ) : (
            <></>
          )}
          {iseditRep != true && (
            <Image src={rep.image_srcs ? rep.image_srcs[0] : ""}></Image>
          )}
        </div>

        <CardBody>
          {iseditRep ? (
            <>
              <form onSubmit={handleSubmit(editRep)}>
                <label htmlFor="file">
                  Uploaded file change
                  <Input
                    {...register("image")}
                    id="file"
                    type="file"
                    onChange={onLoadFile}
                  ></Input>
                </label>
                <Input
                  color="black"
                  backgroundColor="white"
                  defaultValue={rep.text}
                  {...register("text")}
                ></Input>
                <Flex>
                  <Button
                    onClick={() => {
                      setEditRep(false);
                      setImagePreview(rep.image_srcs ? rep.image_srcs : []);
                    }}
                  >
                    cancel
                  </Button>
                  <Button type="submit">edit</Button>
                </Flex>
              </form>
            </>
          ) : (
            <Text style={{ whiteSpace: "pre-wrap" }}>{rep.text}</Text>
          )}
        </CardBody>
        <CardFooter justify="space-between">
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<StarIcon />}
            _hover={{ bg: ThemeColor.backgroundColor }}
          >
            Like
          </Button>
          <Button
            {...buttonProps}
            flex="1"
            variant="ghost"
            leftIcon={<ChatIcon />}
            _hover={{ bg: ThemeColor.backgroundColor }}
          >
            Comment
          </Button>
        </CardFooter>
        <Card {...disclosureProps}>
          <CommentCreate
            rep_id={rep.rep_id}
            IsReply={false}
            onClose={onClose}
          />

          <CommentList data={comments} />
        </Card>
      </Card>
    </>
  );
};

export default Post;
