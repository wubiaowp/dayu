import * as common from './common'

export declare namespace service {
    export interface FilterOpt {
        
    }
    export interface LogsOpts {
        details?: boolean;
        follow?: boolean;
        stdout?: boolean;
        stderr?: boolean;
        since?: number;
        until?: number;
        timestamps?: boolean;
        tail?: number | "all";
    }
}