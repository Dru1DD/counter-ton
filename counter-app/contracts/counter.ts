import { Contract, ContractProvider, Sender, Address, Cell, contractAddress, beginCell } from "@ton/core";
export default class Counter implements Contract {
  static createForDeploy(code: Cell, initialCounterValue: number): Counter {
    const data = beginCell()
      .storeUint(initialCounterValue, 64)
      .endCell();
    const workchain = 0; 
    const address = contractAddress(workchain, { code, data });
    return new Counter(address, { code, data });
  }
  
  constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) {}

  async sendDeploy(provider: ContractProvider, via: Sender) {
    await provider.internal(via, {
      value: "0.01",
      bounce: false
    });
  }
  
  async sendIncrement(provider: ContractProvider, via: Sender) {
    const messageBody = beginCell()
      .storeStringTail("increment")
      .endCell();
    await provider.internal(via, {
      value: "0.002", 
      body: messageBody
    });
  }

  async getCounter(provider: ContractProvider) {
    const { stack } = await provider.get("counter", []);
    return stack.readNumber();
  }
}
