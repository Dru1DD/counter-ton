import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Counter } from '../wrappers/Counter';
import '@ton/test-utils';

describe('Counter', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let counter: SandboxContract<Counter>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        counter = blockchain.openContract(await Counter.fromInit(127n));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await counter.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: counter.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and counter are ready to use
    });

    it("should increase", async () => {
        const valueBefore = await counter.getCounter();
        console.log("ValueBefore", valueBefore);

        await counter.send(deployer.getSender(), 
        {
            value: toNano("0.2")
        }, 
            "increment"
        );
        
        const valueAfter = await counter.getCounter();
        console.log("Value After", valueAfter);

        expect(valueAfter).toBeGreaterThan(valueBefore);
    })

    it("should decrease", async () => {
        for(let i = 0; i < 2; i++) {
            await counter.send(deployer.getSender(), 
            {
                value: toNano("0.2")
            }, 
                "increment"
            );
        }
        
        const valueBefore = await counter.getCounter();
        console.log("ValueBefore", valueBefore);

        await counter.send(
            deployer.getSender(),
            {
                value: toNano("0.02")
            }, 
            "decrement"
        )

        const valueAfter = await counter.getCounter();
        console.log("ValuteAfter", valueAfter);

        expect(valueAfter).toBeLessThan(valueBefore)
    })
});
