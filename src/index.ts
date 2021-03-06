import * as _ from 'lodash';
import './style.css';

import { box } from './utils';
import { 
  TriggerEntity, 
  ColliderEntity,
  NpcEntity,
  PlayerEntity,
  TriggerResourceEntity,
  ColliderResourceEntity
} from './entities';
import { TimeService, InventoryService } from './services';
import { TalkingUI } from './ui';
import { Item, FishItem } from './items';
import { FishResourceEntity } from './entities/resources/FishResourceEntity';

export let camera: HTMLElement = null;
export let map: HTMLElement = null;

export let player: PlayerEntity = null;

export let nook: NpcEntity = null;
export const nookRoutine = require('./@shared/routines/nook/first-routine.json');

export let triggers: TriggerEntity[] = [];

export let colliders: ColliderEntity[] = [];

export const removeFromTrigger = (trigger: TriggerEntity) => {
  triggers = triggers.filter(e => e.getSprite() !== trigger.getSprite()) 
}

const init = () => {
  // create camera HTML
  const cameraHTML = document.createElement('div');
  cameraHTML.id = 'camera';
  cameraHTML.classList.add('camera');
  
  document.body.appendChild(cameraHTML);

  // store camera HTML
  camera = document.getElementById('camera');

  // create map HTML
  const mapHTML = document.createElement('div');
  mapHTML.id = 'map';
  mapHTML.classList.add('map');
  
  camera.appendChild(mapHTML);

  // store map HTML
  map = document.getElementById('map');
}

const onload = () => {
  init();

  colliders = [
    // main island top wall
    new ColliderEntity('wall-1', 'wall', box * 14 - 6, box, 0, box),
    // main island bottom wall
    new ColliderEntity('wall-2', 'wall', box * 14 - 6, box, box * 9, box),
    // main island left wall
    new ColliderEntity('wall-3', 'wall', box, box * 10, 0, 0),
    // main island right wall
    new ColliderEntity('wall-4', 'wall', box, box * 10, 0, box * 15),
    // river
    new ColliderEntity('wall-5', 'wall', box * 2, box * 10, 0, box * 9)
  ];

  player = new PlayerEntity('pipette', box * 2, box * 4);
  colliders.push(player);

  // services
  TimeService.init(6,0);
  InventoryService.init(40, []);

  // UI
  TalkingUI.create();

  // nook npc
  nook = new NpcEntity('Nook', box * 3, box * 2, nookRoutine);
  triggers.push(nook);
  colliders.push(nook);

  triggers.push(new TriggerResourceEntity('stone', (box * 7), (box * 4), new Item("pierre")));
  triggers.push(new FishResourceEntity('fish', (box * 4), (box * 9), new FishItem("carpe", 300, 3, 500, 2000, 3000, 0.5, 1)));
  triggers.push(new FishResourceEntity('fish', (box * 0), (box * 4), new FishItem("bar commun", 200, 1, 500, 2000, 3000, 0.5, 1)));
  
  let tree = new ColliderResourceEntity('tree', (box * 2), (box * 7), [{ item: new Item("love u"), rate: 0.01 }, { item: new Item("feuille"), rate: 0.2 }, { item: new Item("branche"), rate: 1 }])
  triggers.push(tree);
  colliders.push(tree);

  window.addEventListener('keypress', player.listenInput);
} 

window.addEventListener('load', onload);
