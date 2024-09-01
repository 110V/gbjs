import { expect, test } from "bun:test";
import { MMU } from "./MMU";
import { decimalToBits } from "./utils";

test("memory test", () => {
  const mmu = new MMU();
  mmu.loadRom("abcdefg");
  mmu.wb(0xDFFF,0x01);
  mmu.wb(0xFFFF,0x07);
  mmu.wb(0xFE01,0x11);
  mmu.wb(0xFE02,0xF5);
  mmu.ww(0xFF00,0xFF53)
  expect(mmu.rb(0xDFFF)).toEqual(0x01);
  expect(mmu.rb(0xFFFF)).toEqual(0x07);
  expect(mmu.rw(0xFE01)).toEqual(0x11F5);
  expect(mmu.rb(0xFF00)).toEqual(0xFF);
  expect(mmu.rb(0xFF01)).toEqual(0x53);
  expect(mmu.rb(0x0001)).toEqual("b".charCodeAt(0));
});





