import * as api from '../utils/api';
import * as opts from '../api/opts'
import * as types from '../api/types'
import * as http from 'http'

export namespace container {
    export async function list(filters?: opts.container.ListOpts) {
        return await api.get<types.container.Container[]>('/containers/json', filters)
    }

    export async function inspect(id: string, query: { size: boolean } = { size: false }) {
        return await api.get<types.container.ContainerJSON>(`/containers/${id}/json`, query);
    }

    export function prune() {
        return api.post<types.container.ContainerPrune>('/containers/prune');
    }

    export async function logs(id: string, opts: opts.container.LogsOpts = {}): Promise<http.ServerResponse> {
        let data = {
            follow: true,
            stdout: true,
            stderr: true,
            tail: 10,
            ...opts
        }
        return await api.stream(`/containers/${id}/logs`, data);
    }

    export namespace exec {
        export function create(id: string, opts: opts.container.exec.Create = {}): Promise<types.container.exec.CreateResult> {
            let request = {
                AttachStdin: true,
                AttachStdout: true,
                AttachStderr: true,
                DetachKeys: 'ctrl-d',
                Tty: true,
                Cmd: '/bin/sh',
                ...opts
            }
            request.AttachStderr = true
            return api.post<types.container.exec.CreateResult>(`/containers/${id}/exec`, request)
        }
        export function start(id: string, opts: opts.container.exec.Start = {}) {
            return api.post<types.container.exec.StartResult>(`/exec/${id}/start`, opts)
        }
        export function resize(id: string, opts: opts.container.exec.Resize = {}) {
            return api.post<types.container.exec.ResizeResult>(`/exec/${id}/resize`, opts)
        }
        export function inspect(id: string) {
            return api.get<types.container.exec.ExecJson>(`/exec/${id}/json`)
        }
    }
}
