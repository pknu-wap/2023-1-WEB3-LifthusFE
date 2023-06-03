import { TriangleDownIcon } from "@chakra-ui/icons";
import { Flex, Img, Box, Text, useDisclosure } from "@chakra-ui/react";
import { exerciseList } from "../../api/mocks/program.mock";
import { programDB } from "../../store/interfaces/program.interface";
import { userRMInfo } from "./StartPrgram";

const DayRoutine = ({
  routine,
  startDate,
  isStart,
  RMInfo,
  idx,
}: {
  routine: programDB;
  startDate: Date;
  isStart: boolean;
  RMInfo: userRMInfo;
  idx: number;
}) => {
  //Day Routine을 위한 useDisclosure
  const dayWindowHandle = useDisclosure();
  const getdayButtonProps = dayWindowHandle.getButtonProps;
  const getdayDisclosureProps = dayWindowHandle.getDisclosureProps;

  const daybuttonProps = getdayButtonProps();
  const daydisclosureProps = getdayDisclosureProps();

  //날짜 표시을 위한 변수
  const dayname = ["월", "화", "수", "목", "금", "토", "일"];

  const addDaysToDate = ({ date, days }: { date: Date; days: number }) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    console.log(newDate.getDate());

    return newDate;
  };
  const newDate = addDaysToDate({ date: startDate, days: idx });
  return (
    <>
      <Box {...daybuttonProps}>
        <Flex alignItems={"center"}>
          {" "}
          <TriangleDownIcon
            transform={
              dayWindowHandle.isOpen ? "rotate(0deg)" : "rotate(270deg)"
            }
          />
          <Text>{dayname[idx] + "요일"}</Text>
          <Text>{newDate.toISOString().slice(0, 10)}</Text>
        </Flex>
      </Box>
      <Box {...daydisclosureProps} as="span" flex="1" textAlign="left">
        {exerciseList.map((act, idx) => {
          return (
            <Box fontSize={"0.7em"}>
              <Flex
                key={idx}
                direction={"row"}
                justifyContent={"space-around"}
                width="auto"
                alignItems={"center"}
              >
                {act.images ? <Img src={act.images[0]} boxSize="2em" /> : null}
                <Text>{act.name}</Text>
                {isStart ? <Text>{20 * RMInfo[act.name] + "kg"}</Text> : "60%"}
                {
                  <>
                    <Text>{"x" + 3}</Text>
                    {isStart && (
                      <Flex direction={"column"}>
                        <Text>reps</Text>
                        <Text>{3 + "/" + 3}</Text>
                      </Flex>
                    )}
                  </>
                }
              </Flex>
            </Box>
          );
        })}
      </Box>
    </>
  );
};
export default DayRoutine;
