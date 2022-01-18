import { MeshBasicMaterial, PlaneGeometry } from 'three';
import { math } from '../Utils/Math';
import * as THREE from 'three';
import Experience from '../Experience';

export class SpatialHash_Slow {
  constructor(bounds, dimensions) {
    const [x, y] = dimensions;
    this._cells = new Map();
    this._dimensions = dimensions;
    this._bounds = bounds;
  }

  _GetCellIndex(position) {
    const x = math.sat((position[0] - this._bounds[0][0]) / (
        this._bounds[1][0] - this._bounds[0][0]));
    const y = math.sat((position[1] - this._bounds[0][1]) / (
        this._bounds[1][1] - this._bounds[0][1]));

    const xIndex = Math.floor(x * (this._dimensions[0] - 1));
    const yIndex = Math.floor(y * (this._dimensions[1] - 1));

    return [xIndex, yIndex];
  }

  _Key(i1, i2) {
    return i1 + '.' + i2;
  }

  NewClient(position, dimensions) {
    const client = {
      position: position,
      dimensions: dimensions,
      indices: null,
    };

    this._Insert(client);

    return client;
  }

  UpdateClient(client) {
    this.Remove(client);
    this._Insert(client);
  }

  FindNear(position, bounds) {
    const [x, y] = position;
    const [w, h] = bounds;

    const i1 = this._GetCellIndex([x - w / 2, y - h / 2]);
    const i2 = this._GetCellIndex([x + w / 2, y + h / 2]);

    const clients = new Set();

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        const k = this._Key(x, y);

        if (k in this._cells) {
          for (let v of this._cells[k]) {
            clients.add(v);
          }
        }
      }
    }
    return clients;
  }

  _Insert(client) {
    const [x, y] = client.position;
    const [w, h] = client.dimensions;

    const i1 = this._GetCellIndex([x - w / 2, y - h / 2]);
    const i2 = this._GetCellIndex([x + w / 2, y + h / 2]);

    client.indices = [i1, i2];
    if (!client.mesh) {
      client.mesh = new THREE.Mesh(new PlaneGeometry(w, h, 1, 1), new MeshBasicMaterial({
        color: 0x0000ff,
        wireframe: true,
      }));
      client.mesh.position.set(x, 0, y);
      client.mesh.rotation.x = - Math.PI * 0.5
      new Experience().scene.add(client.mesh);

    } else {
      client.mesh.position.set(x, 0, y);
    }

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        const k = this._Key(x, y);
        if (!(k in this._cells)) {
          this._cells[k] = new Set();
        }
        this._cells[k].add(client);
      }
    }

  }

  Remove(client) {
    const [i1, i2] = client.indices;

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        const k = this._Key(x, y);

        this._cells[k].delete(client);
      }
    }
  }
}

