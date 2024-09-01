import { expect, test } from "bun:test";
import { Z80, FLAG } from "./Z80";
import { decimalToBits } from "./utils";

test("flag test", () => {
  const cpu = new Z80();
  cpu.setFlags(0,1,0,1);
  console.log(decimalToBits(cpu.getRegisterValue("af")));
  expect(cpu.getRegisterValue("af")).toEqual(0b000001010000);
  expect(cpu.getFlag(FLAG.z)).toEqual(0);
  expect(cpu.getFlag(FLAG.n)).toEqual(1);
  expect(cpu.getFlag(FLAG.h)).toEqual(0);
  expect(cpu.getFlag(FLAG.c)).toEqual(1);
});





