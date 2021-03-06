import { TriggerEntity, PersonState } from '..';
import { FishingService, FishingState, TalkingService, InventoryService } from '../../services';
import { Item, FishingToolItem, ToolType } from '../../items';
import { box } from '../../utils';
import { player, removeFromTrigger } from '../..';

export enum ResourceEntityBehaviour {
  PICKUP,
  FISHING,
  CATCHING
}

export class TriggerResourceEntity extends TriggerEntity {
  private static CURRENT_ID: number = 1;
  private item: Item;

  constructor(name: string, spriteTop: number, spriteLeft: number, item: Item, behaviour = ResourceEntityBehaviour.PICKUP) {
    // resource is a fish
    if (behaviour === ResourceEntityBehaviour.FISHING) {
      super(`${ name }-${ TriggerResourceEntity.CURRENT_ID++ }`, name, box, box, spriteTop, spriteLeft, (box) * 3, (box) * 3, spriteTop - box, spriteLeft - box);
    }
    else {
      super(`${ name }-${ TriggerResourceEntity.CURRENT_ID++ }`, name, box, box, spriteTop, spriteLeft);
    }
    
    this.item = item;
    super.update();
  }

  public destroy(): void {
    const dialogNext  = TalkingService.talk();

    if (!dialogNext) { 
      // destroy entity
      removeFromTrigger(this);

      // destroy HTML
      super.destroy();
    }
  }

  public act(): void {
    // resource picked up
    if (player.getState() === PersonState.TALKING) {
      this.destroy();
    }
    // pick up resource
    else if (player.getState() === PersonState.IDLE) {
      InventoryService.addItem(this.item);
      TalkingService.start([{ sentence: `Vous ramassez 1 ${ this.item.getName() } !` }]);
    }
  }

  public getItem(): Item {
    return this.item;
  }

  public setItem(item: Item): void {
    this.item = item;
  }
  
}
