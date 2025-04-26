
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model FitbitActivity
 * 
 */
export type FitbitActivity = $Result.DefaultSelection<Prisma.$FitbitActivityPayload>
/**
 * Model UserProfile
 * 
 */
export type UserProfile = $Result.DefaultSelection<Prisma.$UserProfilePayload>
/**
 * Model Goal
 * 
 */
export type Goal = $Result.DefaultSelection<Prisma.$GoalPayload>
/**
 * Model CalendarEvent
 * 
 */
export type CalendarEvent = $Result.DefaultSelection<Prisma.$CalendarEventPayload>
/**
 * Model EventAttachment
 * 
 */
export type EventAttachment = $Result.DefaultSelection<Prisma.$EventAttachmentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more FitbitActivities
 * const fitbitActivities = await prisma.fitbitActivity.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more FitbitActivities
   * const fitbitActivities = await prisma.fitbitActivity.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.fitbitActivity`: Exposes CRUD operations for the **FitbitActivity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FitbitActivities
    * const fitbitActivities = await prisma.fitbitActivity.findMany()
    * ```
    */
  get fitbitActivity(): Prisma.FitbitActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userProfile`: Exposes CRUD operations for the **UserProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserProfiles
    * const userProfiles = await prisma.userProfile.findMany()
    * ```
    */
  get userProfile(): Prisma.UserProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.goal`: Exposes CRUD operations for the **Goal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Goals
    * const goals = await prisma.goal.findMany()
    * ```
    */
  get goal(): Prisma.GoalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.calendarEvent`: Exposes CRUD operations for the **CalendarEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CalendarEvents
    * const calendarEvents = await prisma.calendarEvent.findMany()
    * ```
    */
  get calendarEvent(): Prisma.CalendarEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventAttachment`: Exposes CRUD operations for the **EventAttachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventAttachments
    * const eventAttachments = await prisma.eventAttachment.findMany()
    * ```
    */
  get eventAttachment(): Prisma.EventAttachmentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    FitbitActivity: 'FitbitActivity',
    UserProfile: 'UserProfile',
    Goal: 'Goal',
    CalendarEvent: 'CalendarEvent',
    EventAttachment: 'EventAttachment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "fitbitActivity" | "userProfile" | "goal" | "calendarEvent" | "eventAttachment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      FitbitActivity: {
        payload: Prisma.$FitbitActivityPayload<ExtArgs>
        fields: Prisma.FitbitActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FitbitActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FitbitActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FitbitActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FitbitActivityPayload>
          }
          findFirst: {
            args: Prisma.FitbitActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FitbitActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FitbitActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FitbitActivityPayload>
          }
          findMany: {
            args: Prisma.FitbitActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FitbitActivityPayload>[]
          }
          create: {
            args: Prisma.FitbitActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FitbitActivityPayload>
          }
          createMany: {
            args: Prisma.FitbitActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FitbitActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FitbitActivityPayload>[]
          }
          delete: {
            args: Prisma.FitbitActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FitbitActivityPayload>
          }
          update: {
            args: Prisma.FitbitActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FitbitActivityPayload>
          }
          deleteMany: {
            args: Prisma.FitbitActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FitbitActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FitbitActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FitbitActivityPayload>[]
          }
          upsert: {
            args: Prisma.FitbitActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FitbitActivityPayload>
          }
          aggregate: {
            args: Prisma.FitbitActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFitbitActivity>
          }
          groupBy: {
            args: Prisma.FitbitActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<FitbitActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.FitbitActivityCountArgs<ExtArgs>
            result: $Utils.Optional<FitbitActivityCountAggregateOutputType> | number
          }
        }
      }
      UserProfile: {
        payload: Prisma.$UserProfilePayload<ExtArgs>
        fields: Prisma.UserProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findFirst: {
            args: Prisma.UserProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findMany: {
            args: Prisma.UserProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          create: {
            args: Prisma.UserProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          createMany: {
            args: Prisma.UserProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          delete: {
            args: Prisma.UserProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          update: {
            args: Prisma.UserProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          deleteMany: {
            args: Prisma.UserProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          upsert: {
            args: Prisma.UserProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          aggregate: {
            args: Prisma.UserProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserProfile>
          }
          groupBy: {
            args: Prisma.UserProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserProfileCountArgs<ExtArgs>
            result: $Utils.Optional<UserProfileCountAggregateOutputType> | number
          }
        }
      }
      Goal: {
        payload: Prisma.$GoalPayload<ExtArgs>
        fields: Prisma.GoalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GoalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GoalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          findFirst: {
            args: Prisma.GoalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GoalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          findMany: {
            args: Prisma.GoalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          create: {
            args: Prisma.GoalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          createMany: {
            args: Prisma.GoalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GoalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          delete: {
            args: Prisma.GoalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          update: {
            args: Prisma.GoalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          deleteMany: {
            args: Prisma.GoalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GoalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GoalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          upsert: {
            args: Prisma.GoalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          aggregate: {
            args: Prisma.GoalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGoal>
          }
          groupBy: {
            args: Prisma.GoalGroupByArgs<ExtArgs>
            result: $Utils.Optional<GoalGroupByOutputType>[]
          }
          count: {
            args: Prisma.GoalCountArgs<ExtArgs>
            result: $Utils.Optional<GoalCountAggregateOutputType> | number
          }
        }
      }
      CalendarEvent: {
        payload: Prisma.$CalendarEventPayload<ExtArgs>
        fields: Prisma.CalendarEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CalendarEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CalendarEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          findFirst: {
            args: Prisma.CalendarEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CalendarEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          findMany: {
            args: Prisma.CalendarEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>[]
          }
          create: {
            args: Prisma.CalendarEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          createMany: {
            args: Prisma.CalendarEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CalendarEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>[]
          }
          delete: {
            args: Prisma.CalendarEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          update: {
            args: Prisma.CalendarEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          deleteMany: {
            args: Prisma.CalendarEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CalendarEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CalendarEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>[]
          }
          upsert: {
            args: Prisma.CalendarEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          aggregate: {
            args: Prisma.CalendarEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCalendarEvent>
          }
          groupBy: {
            args: Prisma.CalendarEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<CalendarEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.CalendarEventCountArgs<ExtArgs>
            result: $Utils.Optional<CalendarEventCountAggregateOutputType> | number
          }
        }
      }
      EventAttachment: {
        payload: Prisma.$EventAttachmentPayload<ExtArgs>
        fields: Prisma.EventAttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventAttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventAttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttachmentPayload>
          }
          findFirst: {
            args: Prisma.EventAttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventAttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttachmentPayload>
          }
          findMany: {
            args: Prisma.EventAttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttachmentPayload>[]
          }
          create: {
            args: Prisma.EventAttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttachmentPayload>
          }
          createMany: {
            args: Prisma.EventAttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventAttachmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttachmentPayload>[]
          }
          delete: {
            args: Prisma.EventAttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttachmentPayload>
          }
          update: {
            args: Prisma.EventAttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttachmentPayload>
          }
          deleteMany: {
            args: Prisma.EventAttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventAttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventAttachmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttachmentPayload>[]
          }
          upsert: {
            args: Prisma.EventAttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventAttachmentPayload>
          }
          aggregate: {
            args: Prisma.EventAttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventAttachment>
          }
          groupBy: {
            args: Prisma.EventAttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventAttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventAttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<EventAttachmentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    fitbitActivity?: FitbitActivityOmit
    userProfile?: UserProfileOmit
    goal?: GoalOmit
    calendarEvent?: CalendarEventOmit
    eventAttachment?: EventAttachmentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CalendarEventCountOutputType
   */

  export type CalendarEventCountOutputType = {
    attachments: number
  }

  export type CalendarEventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachments?: boolean | CalendarEventCountOutputTypeCountAttachmentsArgs
  }

  // Custom InputTypes
  /**
   * CalendarEventCountOutputType without action
   */
  export type CalendarEventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEventCountOutputType
     */
    select?: CalendarEventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CalendarEventCountOutputType without action
   */
  export type CalendarEventCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventAttachmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model FitbitActivity
   */

  export type AggregateFitbitActivity = {
    _count: FitbitActivityCountAggregateOutputType | null
    _avg: FitbitActivityAvgAggregateOutputType | null
    _sum: FitbitActivitySumAggregateOutputType | null
    _min: FitbitActivityMinAggregateOutputType | null
    _max: FitbitActivityMaxAggregateOutputType | null
  }

  export type FitbitActivityAvgAggregateOutputType = {
    duration: number | null
    calories: number | null
    steps: number | null
    distance: number | null
  }

  export type FitbitActivitySumAggregateOutputType = {
    duration: number | null
    calories: number | null
    steps: number | null
    distance: number | null
  }

  export type FitbitActivityMinAggregateOutputType = {
    id: string | null
    date: Date | null
    duration: number | null
    calories: number | null
    steps: number | null
    distance: number | null
    lastUpdated: Date | null
    createdAt: Date | null
    manual: boolean | null
  }

  export type FitbitActivityMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    duration: number | null
    calories: number | null
    steps: number | null
    distance: number | null
    lastUpdated: Date | null
    createdAt: Date | null
    manual: boolean | null
  }

  export type FitbitActivityCountAggregateOutputType = {
    id: number
    date: number
    duration: number
    calories: number
    steps: number
    distance: number
    lastUpdated: number
    createdAt: number
    manual: number
    _all: number
  }


  export type FitbitActivityAvgAggregateInputType = {
    duration?: true
    calories?: true
    steps?: true
    distance?: true
  }

  export type FitbitActivitySumAggregateInputType = {
    duration?: true
    calories?: true
    steps?: true
    distance?: true
  }

  export type FitbitActivityMinAggregateInputType = {
    id?: true
    date?: true
    duration?: true
    calories?: true
    steps?: true
    distance?: true
    lastUpdated?: true
    createdAt?: true
    manual?: true
  }

  export type FitbitActivityMaxAggregateInputType = {
    id?: true
    date?: true
    duration?: true
    calories?: true
    steps?: true
    distance?: true
    lastUpdated?: true
    createdAt?: true
    manual?: true
  }

  export type FitbitActivityCountAggregateInputType = {
    id?: true
    date?: true
    duration?: true
    calories?: true
    steps?: true
    distance?: true
    lastUpdated?: true
    createdAt?: true
    manual?: true
    _all?: true
  }

  export type FitbitActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FitbitActivity to aggregate.
     */
    where?: FitbitActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FitbitActivities to fetch.
     */
    orderBy?: FitbitActivityOrderByWithRelationInput | FitbitActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FitbitActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FitbitActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FitbitActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FitbitActivities
    **/
    _count?: true | FitbitActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FitbitActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FitbitActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FitbitActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FitbitActivityMaxAggregateInputType
  }

  export type GetFitbitActivityAggregateType<T extends FitbitActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateFitbitActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFitbitActivity[P]>
      : GetScalarType<T[P], AggregateFitbitActivity[P]>
  }




  export type FitbitActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FitbitActivityWhereInput
    orderBy?: FitbitActivityOrderByWithAggregationInput | FitbitActivityOrderByWithAggregationInput[]
    by: FitbitActivityScalarFieldEnum[] | FitbitActivityScalarFieldEnum
    having?: FitbitActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FitbitActivityCountAggregateInputType | true
    _avg?: FitbitActivityAvgAggregateInputType
    _sum?: FitbitActivitySumAggregateInputType
    _min?: FitbitActivityMinAggregateInputType
    _max?: FitbitActivityMaxAggregateInputType
  }

  export type FitbitActivityGroupByOutputType = {
    id: string
    date: Date
    duration: number
    calories: number
    steps: number
    distance: number
    lastUpdated: Date | null
    createdAt: Date
    manual: boolean
    _count: FitbitActivityCountAggregateOutputType | null
    _avg: FitbitActivityAvgAggregateOutputType | null
    _sum: FitbitActivitySumAggregateOutputType | null
    _min: FitbitActivityMinAggregateOutputType | null
    _max: FitbitActivityMaxAggregateOutputType | null
  }

  type GetFitbitActivityGroupByPayload<T extends FitbitActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FitbitActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FitbitActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FitbitActivityGroupByOutputType[P]>
            : GetScalarType<T[P], FitbitActivityGroupByOutputType[P]>
        }
      >
    >


  export type FitbitActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    duration?: boolean
    calories?: boolean
    steps?: boolean
    distance?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    manual?: boolean
  }, ExtArgs["result"]["fitbitActivity"]>

  export type FitbitActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    duration?: boolean
    calories?: boolean
    steps?: boolean
    distance?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    manual?: boolean
  }, ExtArgs["result"]["fitbitActivity"]>

  export type FitbitActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    duration?: boolean
    calories?: boolean
    steps?: boolean
    distance?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    manual?: boolean
  }, ExtArgs["result"]["fitbitActivity"]>

  export type FitbitActivitySelectScalar = {
    id?: boolean
    date?: boolean
    duration?: boolean
    calories?: boolean
    steps?: boolean
    distance?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    manual?: boolean
  }

  export type FitbitActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "duration" | "calories" | "steps" | "distance" | "lastUpdated" | "createdAt" | "manual", ExtArgs["result"]["fitbitActivity"]>

  export type $FitbitActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FitbitActivity"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      duration: number
      calories: number
      steps: number
      distance: number
      lastUpdated: Date | null
      createdAt: Date
      manual: boolean
    }, ExtArgs["result"]["fitbitActivity"]>
    composites: {}
  }

  type FitbitActivityGetPayload<S extends boolean | null | undefined | FitbitActivityDefaultArgs> = $Result.GetResult<Prisma.$FitbitActivityPayload, S>

  type FitbitActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FitbitActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FitbitActivityCountAggregateInputType | true
    }

  export interface FitbitActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FitbitActivity'], meta: { name: 'FitbitActivity' } }
    /**
     * Find zero or one FitbitActivity that matches the filter.
     * @param {FitbitActivityFindUniqueArgs} args - Arguments to find a FitbitActivity
     * @example
     * // Get one FitbitActivity
     * const fitbitActivity = await prisma.fitbitActivity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FitbitActivityFindUniqueArgs>(args: SelectSubset<T, FitbitActivityFindUniqueArgs<ExtArgs>>): Prisma__FitbitActivityClient<$Result.GetResult<Prisma.$FitbitActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FitbitActivity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FitbitActivityFindUniqueOrThrowArgs} args - Arguments to find a FitbitActivity
     * @example
     * // Get one FitbitActivity
     * const fitbitActivity = await prisma.fitbitActivity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FitbitActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, FitbitActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FitbitActivityClient<$Result.GetResult<Prisma.$FitbitActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FitbitActivity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FitbitActivityFindFirstArgs} args - Arguments to find a FitbitActivity
     * @example
     * // Get one FitbitActivity
     * const fitbitActivity = await prisma.fitbitActivity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FitbitActivityFindFirstArgs>(args?: SelectSubset<T, FitbitActivityFindFirstArgs<ExtArgs>>): Prisma__FitbitActivityClient<$Result.GetResult<Prisma.$FitbitActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FitbitActivity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FitbitActivityFindFirstOrThrowArgs} args - Arguments to find a FitbitActivity
     * @example
     * // Get one FitbitActivity
     * const fitbitActivity = await prisma.fitbitActivity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FitbitActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, FitbitActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__FitbitActivityClient<$Result.GetResult<Prisma.$FitbitActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FitbitActivities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FitbitActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FitbitActivities
     * const fitbitActivities = await prisma.fitbitActivity.findMany()
     * 
     * // Get first 10 FitbitActivities
     * const fitbitActivities = await prisma.fitbitActivity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fitbitActivityWithIdOnly = await prisma.fitbitActivity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FitbitActivityFindManyArgs>(args?: SelectSubset<T, FitbitActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FitbitActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FitbitActivity.
     * @param {FitbitActivityCreateArgs} args - Arguments to create a FitbitActivity.
     * @example
     * // Create one FitbitActivity
     * const FitbitActivity = await prisma.fitbitActivity.create({
     *   data: {
     *     // ... data to create a FitbitActivity
     *   }
     * })
     * 
     */
    create<T extends FitbitActivityCreateArgs>(args: SelectSubset<T, FitbitActivityCreateArgs<ExtArgs>>): Prisma__FitbitActivityClient<$Result.GetResult<Prisma.$FitbitActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FitbitActivities.
     * @param {FitbitActivityCreateManyArgs} args - Arguments to create many FitbitActivities.
     * @example
     * // Create many FitbitActivities
     * const fitbitActivity = await prisma.fitbitActivity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FitbitActivityCreateManyArgs>(args?: SelectSubset<T, FitbitActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FitbitActivities and returns the data saved in the database.
     * @param {FitbitActivityCreateManyAndReturnArgs} args - Arguments to create many FitbitActivities.
     * @example
     * // Create many FitbitActivities
     * const fitbitActivity = await prisma.fitbitActivity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FitbitActivities and only return the `id`
     * const fitbitActivityWithIdOnly = await prisma.fitbitActivity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FitbitActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, FitbitActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FitbitActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FitbitActivity.
     * @param {FitbitActivityDeleteArgs} args - Arguments to delete one FitbitActivity.
     * @example
     * // Delete one FitbitActivity
     * const FitbitActivity = await prisma.fitbitActivity.delete({
     *   where: {
     *     // ... filter to delete one FitbitActivity
     *   }
     * })
     * 
     */
    delete<T extends FitbitActivityDeleteArgs>(args: SelectSubset<T, FitbitActivityDeleteArgs<ExtArgs>>): Prisma__FitbitActivityClient<$Result.GetResult<Prisma.$FitbitActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FitbitActivity.
     * @param {FitbitActivityUpdateArgs} args - Arguments to update one FitbitActivity.
     * @example
     * // Update one FitbitActivity
     * const fitbitActivity = await prisma.fitbitActivity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FitbitActivityUpdateArgs>(args: SelectSubset<T, FitbitActivityUpdateArgs<ExtArgs>>): Prisma__FitbitActivityClient<$Result.GetResult<Prisma.$FitbitActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FitbitActivities.
     * @param {FitbitActivityDeleteManyArgs} args - Arguments to filter FitbitActivities to delete.
     * @example
     * // Delete a few FitbitActivities
     * const { count } = await prisma.fitbitActivity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FitbitActivityDeleteManyArgs>(args?: SelectSubset<T, FitbitActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FitbitActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FitbitActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FitbitActivities
     * const fitbitActivity = await prisma.fitbitActivity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FitbitActivityUpdateManyArgs>(args: SelectSubset<T, FitbitActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FitbitActivities and returns the data updated in the database.
     * @param {FitbitActivityUpdateManyAndReturnArgs} args - Arguments to update many FitbitActivities.
     * @example
     * // Update many FitbitActivities
     * const fitbitActivity = await prisma.fitbitActivity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FitbitActivities and only return the `id`
     * const fitbitActivityWithIdOnly = await prisma.fitbitActivity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FitbitActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, FitbitActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FitbitActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FitbitActivity.
     * @param {FitbitActivityUpsertArgs} args - Arguments to update or create a FitbitActivity.
     * @example
     * // Update or create a FitbitActivity
     * const fitbitActivity = await prisma.fitbitActivity.upsert({
     *   create: {
     *     // ... data to create a FitbitActivity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FitbitActivity we want to update
     *   }
     * })
     */
    upsert<T extends FitbitActivityUpsertArgs>(args: SelectSubset<T, FitbitActivityUpsertArgs<ExtArgs>>): Prisma__FitbitActivityClient<$Result.GetResult<Prisma.$FitbitActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FitbitActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FitbitActivityCountArgs} args - Arguments to filter FitbitActivities to count.
     * @example
     * // Count the number of FitbitActivities
     * const count = await prisma.fitbitActivity.count({
     *   where: {
     *     // ... the filter for the FitbitActivities we want to count
     *   }
     * })
    **/
    count<T extends FitbitActivityCountArgs>(
      args?: Subset<T, FitbitActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FitbitActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FitbitActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FitbitActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FitbitActivityAggregateArgs>(args: Subset<T, FitbitActivityAggregateArgs>): Prisma.PrismaPromise<GetFitbitActivityAggregateType<T>>

    /**
     * Group by FitbitActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FitbitActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FitbitActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FitbitActivityGroupByArgs['orderBy'] }
        : { orderBy?: FitbitActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FitbitActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFitbitActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FitbitActivity model
   */
  readonly fields: FitbitActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FitbitActivity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FitbitActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FitbitActivity model
   */
  interface FitbitActivityFieldRefs {
    readonly id: FieldRef<"FitbitActivity", 'String'>
    readonly date: FieldRef<"FitbitActivity", 'DateTime'>
    readonly duration: FieldRef<"FitbitActivity", 'Int'>
    readonly calories: FieldRef<"FitbitActivity", 'Int'>
    readonly steps: FieldRef<"FitbitActivity", 'Int'>
    readonly distance: FieldRef<"FitbitActivity", 'Float'>
    readonly lastUpdated: FieldRef<"FitbitActivity", 'DateTime'>
    readonly createdAt: FieldRef<"FitbitActivity", 'DateTime'>
    readonly manual: FieldRef<"FitbitActivity", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * FitbitActivity findUnique
   */
  export type FitbitActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FitbitActivity
     */
    select?: FitbitActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FitbitActivity
     */
    omit?: FitbitActivityOmit<ExtArgs> | null
    /**
     * Filter, which FitbitActivity to fetch.
     */
    where: FitbitActivityWhereUniqueInput
  }

  /**
   * FitbitActivity findUniqueOrThrow
   */
  export type FitbitActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FitbitActivity
     */
    select?: FitbitActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FitbitActivity
     */
    omit?: FitbitActivityOmit<ExtArgs> | null
    /**
     * Filter, which FitbitActivity to fetch.
     */
    where: FitbitActivityWhereUniqueInput
  }

  /**
   * FitbitActivity findFirst
   */
  export type FitbitActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FitbitActivity
     */
    select?: FitbitActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FitbitActivity
     */
    omit?: FitbitActivityOmit<ExtArgs> | null
    /**
     * Filter, which FitbitActivity to fetch.
     */
    where?: FitbitActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FitbitActivities to fetch.
     */
    orderBy?: FitbitActivityOrderByWithRelationInput | FitbitActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FitbitActivities.
     */
    cursor?: FitbitActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FitbitActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FitbitActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FitbitActivities.
     */
    distinct?: FitbitActivityScalarFieldEnum | FitbitActivityScalarFieldEnum[]
  }

  /**
   * FitbitActivity findFirstOrThrow
   */
  export type FitbitActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FitbitActivity
     */
    select?: FitbitActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FitbitActivity
     */
    omit?: FitbitActivityOmit<ExtArgs> | null
    /**
     * Filter, which FitbitActivity to fetch.
     */
    where?: FitbitActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FitbitActivities to fetch.
     */
    orderBy?: FitbitActivityOrderByWithRelationInput | FitbitActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FitbitActivities.
     */
    cursor?: FitbitActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FitbitActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FitbitActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FitbitActivities.
     */
    distinct?: FitbitActivityScalarFieldEnum | FitbitActivityScalarFieldEnum[]
  }

  /**
   * FitbitActivity findMany
   */
  export type FitbitActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FitbitActivity
     */
    select?: FitbitActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FitbitActivity
     */
    omit?: FitbitActivityOmit<ExtArgs> | null
    /**
     * Filter, which FitbitActivities to fetch.
     */
    where?: FitbitActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FitbitActivities to fetch.
     */
    orderBy?: FitbitActivityOrderByWithRelationInput | FitbitActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FitbitActivities.
     */
    cursor?: FitbitActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FitbitActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FitbitActivities.
     */
    skip?: number
    distinct?: FitbitActivityScalarFieldEnum | FitbitActivityScalarFieldEnum[]
  }

  /**
   * FitbitActivity create
   */
  export type FitbitActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FitbitActivity
     */
    select?: FitbitActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FitbitActivity
     */
    omit?: FitbitActivityOmit<ExtArgs> | null
    /**
     * The data needed to create a FitbitActivity.
     */
    data: XOR<FitbitActivityCreateInput, FitbitActivityUncheckedCreateInput>
  }

  /**
   * FitbitActivity createMany
   */
  export type FitbitActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FitbitActivities.
     */
    data: FitbitActivityCreateManyInput | FitbitActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FitbitActivity createManyAndReturn
   */
  export type FitbitActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FitbitActivity
     */
    select?: FitbitActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FitbitActivity
     */
    omit?: FitbitActivityOmit<ExtArgs> | null
    /**
     * The data used to create many FitbitActivities.
     */
    data: FitbitActivityCreateManyInput | FitbitActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FitbitActivity update
   */
  export type FitbitActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FitbitActivity
     */
    select?: FitbitActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FitbitActivity
     */
    omit?: FitbitActivityOmit<ExtArgs> | null
    /**
     * The data needed to update a FitbitActivity.
     */
    data: XOR<FitbitActivityUpdateInput, FitbitActivityUncheckedUpdateInput>
    /**
     * Choose, which FitbitActivity to update.
     */
    where: FitbitActivityWhereUniqueInput
  }

  /**
   * FitbitActivity updateMany
   */
  export type FitbitActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FitbitActivities.
     */
    data: XOR<FitbitActivityUpdateManyMutationInput, FitbitActivityUncheckedUpdateManyInput>
    /**
     * Filter which FitbitActivities to update
     */
    where?: FitbitActivityWhereInput
    /**
     * Limit how many FitbitActivities to update.
     */
    limit?: number
  }

  /**
   * FitbitActivity updateManyAndReturn
   */
  export type FitbitActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FitbitActivity
     */
    select?: FitbitActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FitbitActivity
     */
    omit?: FitbitActivityOmit<ExtArgs> | null
    /**
     * The data used to update FitbitActivities.
     */
    data: XOR<FitbitActivityUpdateManyMutationInput, FitbitActivityUncheckedUpdateManyInput>
    /**
     * Filter which FitbitActivities to update
     */
    where?: FitbitActivityWhereInput
    /**
     * Limit how many FitbitActivities to update.
     */
    limit?: number
  }

  /**
   * FitbitActivity upsert
   */
  export type FitbitActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FitbitActivity
     */
    select?: FitbitActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FitbitActivity
     */
    omit?: FitbitActivityOmit<ExtArgs> | null
    /**
     * The filter to search for the FitbitActivity to update in case it exists.
     */
    where: FitbitActivityWhereUniqueInput
    /**
     * In case the FitbitActivity found by the `where` argument doesn't exist, create a new FitbitActivity with this data.
     */
    create: XOR<FitbitActivityCreateInput, FitbitActivityUncheckedCreateInput>
    /**
     * In case the FitbitActivity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FitbitActivityUpdateInput, FitbitActivityUncheckedUpdateInput>
  }

  /**
   * FitbitActivity delete
   */
  export type FitbitActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FitbitActivity
     */
    select?: FitbitActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FitbitActivity
     */
    omit?: FitbitActivityOmit<ExtArgs> | null
    /**
     * Filter which FitbitActivity to delete.
     */
    where: FitbitActivityWhereUniqueInput
  }

  /**
   * FitbitActivity deleteMany
   */
  export type FitbitActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FitbitActivities to delete
     */
    where?: FitbitActivityWhereInput
    /**
     * Limit how many FitbitActivities to delete.
     */
    limit?: number
  }

  /**
   * FitbitActivity without action
   */
  export type FitbitActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FitbitActivity
     */
    select?: FitbitActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FitbitActivity
     */
    omit?: FitbitActivityOmit<ExtArgs> | null
  }


  /**
   * Model UserProfile
   */

  export type AggregateUserProfile = {
    _count: UserProfileCountAggregateOutputType | null
    _avg: UserProfileAvgAggregateOutputType | null
    _sum: UserProfileSumAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  export type UserProfileAvgAggregateOutputType = {
    age: number | null
    weightKg: number | null
    heightCm: number | null
  }

  export type UserProfileSumAggregateOutputType = {
    age: number | null
    weightKg: number | null
    heightCm: number | null
  }

  export type UserProfileMinAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    name: string | null
    age: number | null
    weightKg: number | null
    heightCm: number | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserProfileMaxAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    name: string | null
    age: number | null
    weightKg: number | null
    heightCm: number | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserProfileCountAggregateOutputType = {
    id: number
    username: number
    password: number
    name: number
    age: number
    weightKg: number
    heightCm: number
    avatarUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserProfileAvgAggregateInputType = {
    age?: true
    weightKg?: true
    heightCm?: true
  }

  export type UserProfileSumAggregateInputType = {
    age?: true
    weightKg?: true
    heightCm?: true
  }

  export type UserProfileMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    name?: true
    age?: true
    weightKg?: true
    heightCm?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserProfileMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    name?: true
    age?: true
    weightKg?: true
    heightCm?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserProfileCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    name?: true
    age?: true
    weightKg?: true
    heightCm?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfile to aggregate.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserProfiles
    **/
    _count?: true | UserProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserProfileMaxAggregateInputType
  }

  export type GetUserProfileAggregateType<T extends UserProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateUserProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserProfile[P]>
      : GetScalarType<T[P], AggregateUserProfile[P]>
  }




  export type UserProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProfileWhereInput
    orderBy?: UserProfileOrderByWithAggregationInput | UserProfileOrderByWithAggregationInput[]
    by: UserProfileScalarFieldEnum[] | UserProfileScalarFieldEnum
    having?: UserProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserProfileCountAggregateInputType | true
    _avg?: UserProfileAvgAggregateInputType
    _sum?: UserProfileSumAggregateInputType
    _min?: UserProfileMinAggregateInputType
    _max?: UserProfileMaxAggregateInputType
  }

  export type UserProfileGroupByOutputType = {
    id: string
    username: string
    password: string
    name: string
    age: number | null
    weightKg: number | null
    heightCm: number | null
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserProfileCountAggregateOutputType | null
    _avg: UserProfileAvgAggregateOutputType | null
    _sum: UserProfileSumAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  type GetUserProfileGroupByPayload<T extends UserProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
            : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
        }
      >
    >


  export type UserProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    age?: boolean
    weightKg?: boolean
    heightCm?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    age?: boolean
    weightKg?: boolean
    heightCm?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    age?: boolean
    weightKg?: boolean
    heightCm?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    age?: boolean
    weightKg?: boolean
    heightCm?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "name" | "age" | "weightKg" | "heightCm" | "avatarUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["userProfile"]>

  export type $UserProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserProfile"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      password: string
      name: string
      age: number | null
      weightKg: number | null
      heightCm: number | null
      avatarUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userProfile"]>
    composites: {}
  }

  type UserProfileGetPayload<S extends boolean | null | undefined | UserProfileDefaultArgs> = $Result.GetResult<Prisma.$UserProfilePayload, S>

  type UserProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserProfileCountAggregateInputType | true
    }

  export interface UserProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserProfile'], meta: { name: 'UserProfile' } }
    /**
     * Find zero or one UserProfile that matches the filter.
     * @param {UserProfileFindUniqueArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProfileFindUniqueArgs>(args: SelectSubset<T, UserProfileFindUniqueArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProfileFindUniqueOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, UserProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProfileFindFirstArgs>(args?: SelectSubset<T, UserProfileFindFirstArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, UserProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProfiles
     * const userProfiles = await prisma.userProfile.findMany()
     * 
     * // Get first 10 UserProfiles
     * const userProfiles = await prisma.userProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserProfileFindManyArgs>(args?: SelectSubset<T, UserProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserProfile.
     * @param {UserProfileCreateArgs} args - Arguments to create a UserProfile.
     * @example
     * // Create one UserProfile
     * const UserProfile = await prisma.userProfile.create({
     *   data: {
     *     // ... data to create a UserProfile
     *   }
     * })
     * 
     */
    create<T extends UserProfileCreateArgs>(args: SelectSubset<T, UserProfileCreateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserProfiles.
     * @param {UserProfileCreateManyArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserProfileCreateManyArgs>(args?: SelectSubset<T, UserProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserProfiles and returns the data saved in the database.
     * @param {UserProfileCreateManyAndReturnArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, UserProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserProfile.
     * @param {UserProfileDeleteArgs} args - Arguments to delete one UserProfile.
     * @example
     * // Delete one UserProfile
     * const UserProfile = await prisma.userProfile.delete({
     *   where: {
     *     // ... filter to delete one UserProfile
     *   }
     * })
     * 
     */
    delete<T extends UserProfileDeleteArgs>(args: SelectSubset<T, UserProfileDeleteArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserProfile.
     * @param {UserProfileUpdateArgs} args - Arguments to update one UserProfile.
     * @example
     * // Update one UserProfile
     * const userProfile = await prisma.userProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserProfileUpdateArgs>(args: SelectSubset<T, UserProfileUpdateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserProfiles.
     * @param {UserProfileDeleteManyArgs} args - Arguments to filter UserProfiles to delete.
     * @example
     * // Delete a few UserProfiles
     * const { count } = await prisma.userProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserProfileDeleteManyArgs>(args?: SelectSubset<T, UserProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserProfileUpdateManyArgs>(args: SelectSubset<T, UserProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles and returns the data updated in the database.
     * @param {UserProfileUpdateManyAndReturnArgs} args - Arguments to update many UserProfiles.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, UserProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserProfile.
     * @param {UserProfileUpsertArgs} args - Arguments to update or create a UserProfile.
     * @example
     * // Update or create a UserProfile
     * const userProfile = await prisma.userProfile.upsert({
     *   create: {
     *     // ... data to create a UserProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProfile we want to update
     *   }
     * })
     */
    upsert<T extends UserProfileUpsertArgs>(args: SelectSubset<T, UserProfileUpsertArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileCountArgs} args - Arguments to filter UserProfiles to count.
     * @example
     * // Count the number of UserProfiles
     * const count = await prisma.userProfile.count({
     *   where: {
     *     // ... the filter for the UserProfiles we want to count
     *   }
     * })
    **/
    count<T extends UserProfileCountArgs>(
      args?: Subset<T, UserProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserProfileAggregateArgs>(args: Subset<T, UserProfileAggregateArgs>): Prisma.PrismaPromise<GetUserProfileAggregateType<T>>

    /**
     * Group by UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserProfileGroupByArgs['orderBy'] }
        : { orderBy?: UserProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserProfile model
   */
  readonly fields: UserProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserProfile model
   */
  interface UserProfileFieldRefs {
    readonly id: FieldRef<"UserProfile", 'String'>
    readonly username: FieldRef<"UserProfile", 'String'>
    readonly password: FieldRef<"UserProfile", 'String'>
    readonly name: FieldRef<"UserProfile", 'String'>
    readonly age: FieldRef<"UserProfile", 'Int'>
    readonly weightKg: FieldRef<"UserProfile", 'Float'>
    readonly heightCm: FieldRef<"UserProfile", 'Float'>
    readonly avatarUrl: FieldRef<"UserProfile", 'String'>
    readonly createdAt: FieldRef<"UserProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"UserProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserProfile findUnique
   */
  export type UserProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findUniqueOrThrow
   */
  export type UserProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findFirst
   */
  export type UserProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findFirstOrThrow
   */
  export type UserProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findMany
   */
  export type UserProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter, which UserProfiles to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile create
   */
  export type UserProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data needed to create a UserProfile.
     */
    data: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
  }

  /**
   * UserProfile createMany
   */
  export type UserProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProfile createManyAndReturn
   */
  export type UserProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProfile update
   */
  export type UserProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data needed to update a UserProfile.
     */
    data: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
    /**
     * Choose, which UserProfile to update.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile updateMany
   */
  export type UserProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile updateManyAndReturn
   */
  export type UserProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile upsert
   */
  export type UserProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The filter to search for the UserProfile to update in case it exists.
     */
    where: UserProfileWhereUniqueInput
    /**
     * In case the UserProfile found by the `where` argument doesn't exist, create a new UserProfile with this data.
     */
    create: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
    /**
     * In case the UserProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
  }

  /**
   * UserProfile delete
   */
  export type UserProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Filter which UserProfile to delete.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile deleteMany
   */
  export type UserProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfiles to delete
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to delete.
     */
    limit?: number
  }

  /**
   * UserProfile without action
   */
  export type UserProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
  }


  /**
   * Model Goal
   */

  export type AggregateGoal = {
    _count: GoalCountAggregateOutputType | null
    _avg: GoalAvgAggregateOutputType | null
    _sum: GoalSumAggregateOutputType | null
    _min: GoalMinAggregateOutputType | null
    _max: GoalMaxAggregateOutputType | null
  }

  export type GoalAvgAggregateOutputType = {
    target: number | null
    progress: number | null
  }

  export type GoalSumAggregateOutputType = {
    target: number | null
    progress: number | null
  }

  export type GoalMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    type: string | null
    target: number | null
    unit: string | null
    progress: number | null
    completed: boolean | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GoalMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    type: string | null
    target: number | null
    unit: string | null
    progress: number | null
    completed: boolean | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GoalCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    type: number
    target: number
    unit: number
    progress: number
    completed: number
    startDate: number
    endDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GoalAvgAggregateInputType = {
    target?: true
    progress?: true
  }

  export type GoalSumAggregateInputType = {
    target?: true
    progress?: true
  }

  export type GoalMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    type?: true
    target?: true
    unit?: true
    progress?: true
    completed?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GoalMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    type?: true
    target?: true
    unit?: true
    progress?: true
    completed?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GoalCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    type?: true
    target?: true
    unit?: true
    progress?: true
    completed?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GoalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Goal to aggregate.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Goals
    **/
    _count?: true | GoalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GoalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GoalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GoalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GoalMaxAggregateInputType
  }

  export type GetGoalAggregateType<T extends GoalAggregateArgs> = {
        [P in keyof T & keyof AggregateGoal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGoal[P]>
      : GetScalarType<T[P], AggregateGoal[P]>
  }




  export type GoalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoalWhereInput
    orderBy?: GoalOrderByWithAggregationInput | GoalOrderByWithAggregationInput[]
    by: GoalScalarFieldEnum[] | GoalScalarFieldEnum
    having?: GoalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GoalCountAggregateInputType | true
    _avg?: GoalAvgAggregateInputType
    _sum?: GoalSumAggregateInputType
    _min?: GoalMinAggregateInputType
    _max?: GoalMaxAggregateInputType
  }

  export type GoalGroupByOutputType = {
    id: string
    userId: string
    title: string
    type: string
    target: number
    unit: string
    progress: number
    completed: boolean
    startDate: Date
    endDate: Date
    createdAt: Date
    updatedAt: Date
    _count: GoalCountAggregateOutputType | null
    _avg: GoalAvgAggregateOutputType | null
    _sum: GoalSumAggregateOutputType | null
    _min: GoalMinAggregateOutputType | null
    _max: GoalMaxAggregateOutputType | null
  }

  type GetGoalGroupByPayload<T extends GoalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GoalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GoalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GoalGroupByOutputType[P]>
            : GetScalarType<T[P], GoalGroupByOutputType[P]>
        }
      >
    >


  export type GoalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    type?: boolean
    target?: boolean
    unit?: boolean
    progress?: boolean
    completed?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    type?: boolean
    target?: boolean
    unit?: boolean
    progress?: boolean
    completed?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    type?: boolean
    target?: boolean
    unit?: boolean
    progress?: boolean
    completed?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    type?: boolean
    target?: boolean
    unit?: boolean
    progress?: boolean
    completed?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GoalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "type" | "target" | "unit" | "progress" | "completed" | "startDate" | "endDate" | "createdAt" | "updatedAt", ExtArgs["result"]["goal"]>

  export type $GoalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Goal"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      type: string
      target: number
      unit: string
      progress: number
      completed: boolean
      startDate: Date
      endDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["goal"]>
    composites: {}
  }

  type GoalGetPayload<S extends boolean | null | undefined | GoalDefaultArgs> = $Result.GetResult<Prisma.$GoalPayload, S>

  type GoalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GoalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GoalCountAggregateInputType | true
    }

  export interface GoalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Goal'], meta: { name: 'Goal' } }
    /**
     * Find zero or one Goal that matches the filter.
     * @param {GoalFindUniqueArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GoalFindUniqueArgs>(args: SelectSubset<T, GoalFindUniqueArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Goal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GoalFindUniqueOrThrowArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GoalFindUniqueOrThrowArgs>(args: SelectSubset<T, GoalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Goal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindFirstArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GoalFindFirstArgs>(args?: SelectSubset<T, GoalFindFirstArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Goal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindFirstOrThrowArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GoalFindFirstOrThrowArgs>(args?: SelectSubset<T, GoalFindFirstOrThrowArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Goals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Goals
     * const goals = await prisma.goal.findMany()
     * 
     * // Get first 10 Goals
     * const goals = await prisma.goal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const goalWithIdOnly = await prisma.goal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GoalFindManyArgs>(args?: SelectSubset<T, GoalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Goal.
     * @param {GoalCreateArgs} args - Arguments to create a Goal.
     * @example
     * // Create one Goal
     * const Goal = await prisma.goal.create({
     *   data: {
     *     // ... data to create a Goal
     *   }
     * })
     * 
     */
    create<T extends GoalCreateArgs>(args: SelectSubset<T, GoalCreateArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Goals.
     * @param {GoalCreateManyArgs} args - Arguments to create many Goals.
     * @example
     * // Create many Goals
     * const goal = await prisma.goal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GoalCreateManyArgs>(args?: SelectSubset<T, GoalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Goals and returns the data saved in the database.
     * @param {GoalCreateManyAndReturnArgs} args - Arguments to create many Goals.
     * @example
     * // Create many Goals
     * const goal = await prisma.goal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Goals and only return the `id`
     * const goalWithIdOnly = await prisma.goal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GoalCreateManyAndReturnArgs>(args?: SelectSubset<T, GoalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Goal.
     * @param {GoalDeleteArgs} args - Arguments to delete one Goal.
     * @example
     * // Delete one Goal
     * const Goal = await prisma.goal.delete({
     *   where: {
     *     // ... filter to delete one Goal
     *   }
     * })
     * 
     */
    delete<T extends GoalDeleteArgs>(args: SelectSubset<T, GoalDeleteArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Goal.
     * @param {GoalUpdateArgs} args - Arguments to update one Goal.
     * @example
     * // Update one Goal
     * const goal = await prisma.goal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GoalUpdateArgs>(args: SelectSubset<T, GoalUpdateArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Goals.
     * @param {GoalDeleteManyArgs} args - Arguments to filter Goals to delete.
     * @example
     * // Delete a few Goals
     * const { count } = await prisma.goal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GoalDeleteManyArgs>(args?: SelectSubset<T, GoalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Goals
     * const goal = await prisma.goal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GoalUpdateManyArgs>(args: SelectSubset<T, GoalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Goals and returns the data updated in the database.
     * @param {GoalUpdateManyAndReturnArgs} args - Arguments to update many Goals.
     * @example
     * // Update many Goals
     * const goal = await prisma.goal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Goals and only return the `id`
     * const goalWithIdOnly = await prisma.goal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GoalUpdateManyAndReturnArgs>(args: SelectSubset<T, GoalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Goal.
     * @param {GoalUpsertArgs} args - Arguments to update or create a Goal.
     * @example
     * // Update or create a Goal
     * const goal = await prisma.goal.upsert({
     *   create: {
     *     // ... data to create a Goal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Goal we want to update
     *   }
     * })
     */
    upsert<T extends GoalUpsertArgs>(args: SelectSubset<T, GoalUpsertArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalCountArgs} args - Arguments to filter Goals to count.
     * @example
     * // Count the number of Goals
     * const count = await prisma.goal.count({
     *   where: {
     *     // ... the filter for the Goals we want to count
     *   }
     * })
    **/
    count<T extends GoalCountArgs>(
      args?: Subset<T, GoalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GoalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Goal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GoalAggregateArgs>(args: Subset<T, GoalAggregateArgs>): Prisma.PrismaPromise<GetGoalAggregateType<T>>

    /**
     * Group by Goal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GoalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GoalGroupByArgs['orderBy'] }
        : { orderBy?: GoalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GoalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Goal model
   */
  readonly fields: GoalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Goal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GoalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Goal model
   */
  interface GoalFieldRefs {
    readonly id: FieldRef<"Goal", 'String'>
    readonly userId: FieldRef<"Goal", 'String'>
    readonly title: FieldRef<"Goal", 'String'>
    readonly type: FieldRef<"Goal", 'String'>
    readonly target: FieldRef<"Goal", 'Float'>
    readonly unit: FieldRef<"Goal", 'String'>
    readonly progress: FieldRef<"Goal", 'Float'>
    readonly completed: FieldRef<"Goal", 'Boolean'>
    readonly startDate: FieldRef<"Goal", 'DateTime'>
    readonly endDate: FieldRef<"Goal", 'DateTime'>
    readonly createdAt: FieldRef<"Goal", 'DateTime'>
    readonly updatedAt: FieldRef<"Goal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Goal findUnique
   */
  export type GoalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal findUniqueOrThrow
   */
  export type GoalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal findFirst
   */
  export type GoalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Goals.
     */
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal findFirstOrThrow
   */
  export type GoalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Goals.
     */
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal findMany
   */
  export type GoalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Filter, which Goals to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal create
   */
  export type GoalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The data needed to create a Goal.
     */
    data: XOR<GoalCreateInput, GoalUncheckedCreateInput>
  }

  /**
   * Goal createMany
   */
  export type GoalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Goals.
     */
    data: GoalCreateManyInput | GoalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Goal createManyAndReturn
   */
  export type GoalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The data used to create many Goals.
     */
    data: GoalCreateManyInput | GoalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Goal update
   */
  export type GoalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The data needed to update a Goal.
     */
    data: XOR<GoalUpdateInput, GoalUncheckedUpdateInput>
    /**
     * Choose, which Goal to update.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal updateMany
   */
  export type GoalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Goals.
     */
    data: XOR<GoalUpdateManyMutationInput, GoalUncheckedUpdateManyInput>
    /**
     * Filter which Goals to update
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to update.
     */
    limit?: number
  }

  /**
   * Goal updateManyAndReturn
   */
  export type GoalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The data used to update Goals.
     */
    data: XOR<GoalUpdateManyMutationInput, GoalUncheckedUpdateManyInput>
    /**
     * Filter which Goals to update
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to update.
     */
    limit?: number
  }

  /**
   * Goal upsert
   */
  export type GoalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The filter to search for the Goal to update in case it exists.
     */
    where: GoalWhereUniqueInput
    /**
     * In case the Goal found by the `where` argument doesn't exist, create a new Goal with this data.
     */
    create: XOR<GoalCreateInput, GoalUncheckedCreateInput>
    /**
     * In case the Goal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GoalUpdateInput, GoalUncheckedUpdateInput>
  }

  /**
   * Goal delete
   */
  export type GoalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Filter which Goal to delete.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal deleteMany
   */
  export type GoalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Goals to delete
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to delete.
     */
    limit?: number
  }

  /**
   * Goal without action
   */
  export type GoalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
  }


  /**
   * Model CalendarEvent
   */

  export type AggregateCalendarEvent = {
    _count: CalendarEventCountAggregateOutputType | null
    _avg: CalendarEventAvgAggregateOutputType | null
    _sum: CalendarEventSumAggregateOutputType | null
    _min: CalendarEventMinAggregateOutputType | null
    _max: CalendarEventMaxAggregateOutputType | null
  }

  export type CalendarEventAvgAggregateOutputType = {
    reminderBefore: number | null
  }

  export type CalendarEventSumAggregateOutputType = {
    reminderBefore: number | null
  }

  export type CalendarEventMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    allDay: boolean | null
    location: string | null
    color: string | null
    isRecurring: boolean | null
    recurrenceRule: string | null
    reminderBefore: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CalendarEventMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    allDay: boolean | null
    location: string | null
    color: string | null
    isRecurring: boolean | null
    recurrenceRule: string | null
    reminderBefore: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CalendarEventCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    description: number
    startDate: number
    endDate: number
    allDay: number
    location: number
    color: number
    isRecurring: number
    recurrenceRule: number
    reminderBefore: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CalendarEventAvgAggregateInputType = {
    reminderBefore?: true
  }

  export type CalendarEventSumAggregateInputType = {
    reminderBefore?: true
  }

  export type CalendarEventMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    startDate?: true
    endDate?: true
    allDay?: true
    location?: true
    color?: true
    isRecurring?: true
    recurrenceRule?: true
    reminderBefore?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CalendarEventMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    startDate?: true
    endDate?: true
    allDay?: true
    location?: true
    color?: true
    isRecurring?: true
    recurrenceRule?: true
    reminderBefore?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CalendarEventCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    startDate?: true
    endDate?: true
    allDay?: true
    location?: true
    color?: true
    isRecurring?: true
    recurrenceRule?: true
    reminderBefore?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CalendarEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CalendarEvent to aggregate.
     */
    where?: CalendarEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CalendarEvents to fetch.
     */
    orderBy?: CalendarEventOrderByWithRelationInput | CalendarEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CalendarEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CalendarEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CalendarEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CalendarEvents
    **/
    _count?: true | CalendarEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CalendarEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CalendarEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CalendarEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CalendarEventMaxAggregateInputType
  }

  export type GetCalendarEventAggregateType<T extends CalendarEventAggregateArgs> = {
        [P in keyof T & keyof AggregateCalendarEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCalendarEvent[P]>
      : GetScalarType<T[P], AggregateCalendarEvent[P]>
  }




  export type CalendarEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CalendarEventWhereInput
    orderBy?: CalendarEventOrderByWithAggregationInput | CalendarEventOrderByWithAggregationInput[]
    by: CalendarEventScalarFieldEnum[] | CalendarEventScalarFieldEnum
    having?: CalendarEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CalendarEventCountAggregateInputType | true
    _avg?: CalendarEventAvgAggregateInputType
    _sum?: CalendarEventSumAggregateInputType
    _min?: CalendarEventMinAggregateInputType
    _max?: CalendarEventMaxAggregateInputType
  }

  export type CalendarEventGroupByOutputType = {
    id: string
    userId: string
    title: string
    description: string | null
    startDate: Date
    endDate: Date
    allDay: boolean
    location: string | null
    color: string | null
    isRecurring: boolean
    recurrenceRule: string | null
    reminderBefore: number | null
    createdAt: Date
    updatedAt: Date
    _count: CalendarEventCountAggregateOutputType | null
    _avg: CalendarEventAvgAggregateOutputType | null
    _sum: CalendarEventSumAggregateOutputType | null
    _min: CalendarEventMinAggregateOutputType | null
    _max: CalendarEventMaxAggregateOutputType | null
  }

  type GetCalendarEventGroupByPayload<T extends CalendarEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CalendarEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CalendarEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CalendarEventGroupByOutputType[P]>
            : GetScalarType<T[P], CalendarEventGroupByOutputType[P]>
        }
      >
    >


  export type CalendarEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    allDay?: boolean
    location?: boolean
    color?: boolean
    isRecurring?: boolean
    recurrenceRule?: boolean
    reminderBefore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attachments?: boolean | CalendarEvent$attachmentsArgs<ExtArgs>
    _count?: boolean | CalendarEventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calendarEvent"]>

  export type CalendarEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    allDay?: boolean
    location?: boolean
    color?: boolean
    isRecurring?: boolean
    recurrenceRule?: boolean
    reminderBefore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["calendarEvent"]>

  export type CalendarEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    allDay?: boolean
    location?: boolean
    color?: boolean
    isRecurring?: boolean
    recurrenceRule?: boolean
    reminderBefore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["calendarEvent"]>

  export type CalendarEventSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    allDay?: boolean
    location?: boolean
    color?: boolean
    isRecurring?: boolean
    recurrenceRule?: boolean
    reminderBefore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CalendarEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "description" | "startDate" | "endDate" | "allDay" | "location" | "color" | "isRecurring" | "recurrenceRule" | "reminderBefore" | "createdAt" | "updatedAt", ExtArgs["result"]["calendarEvent"]>
  export type CalendarEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachments?: boolean | CalendarEvent$attachmentsArgs<ExtArgs>
    _count?: boolean | CalendarEventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CalendarEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CalendarEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CalendarEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CalendarEvent"
    objects: {
      attachments: Prisma.$EventAttachmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      description: string | null
      startDate: Date
      endDate: Date
      allDay: boolean
      location: string | null
      color: string | null
      isRecurring: boolean
      recurrenceRule: string | null
      reminderBefore: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["calendarEvent"]>
    composites: {}
  }

  type CalendarEventGetPayload<S extends boolean | null | undefined | CalendarEventDefaultArgs> = $Result.GetResult<Prisma.$CalendarEventPayload, S>

  type CalendarEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CalendarEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CalendarEventCountAggregateInputType | true
    }

  export interface CalendarEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CalendarEvent'], meta: { name: 'CalendarEvent' } }
    /**
     * Find zero or one CalendarEvent that matches the filter.
     * @param {CalendarEventFindUniqueArgs} args - Arguments to find a CalendarEvent
     * @example
     * // Get one CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CalendarEventFindUniqueArgs>(args: SelectSubset<T, CalendarEventFindUniqueArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CalendarEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CalendarEventFindUniqueOrThrowArgs} args - Arguments to find a CalendarEvent
     * @example
     * // Get one CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CalendarEventFindUniqueOrThrowArgs>(args: SelectSubset<T, CalendarEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CalendarEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventFindFirstArgs} args - Arguments to find a CalendarEvent
     * @example
     * // Get one CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CalendarEventFindFirstArgs>(args?: SelectSubset<T, CalendarEventFindFirstArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CalendarEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventFindFirstOrThrowArgs} args - Arguments to find a CalendarEvent
     * @example
     * // Get one CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CalendarEventFindFirstOrThrowArgs>(args?: SelectSubset<T, CalendarEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CalendarEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CalendarEvents
     * const calendarEvents = await prisma.calendarEvent.findMany()
     * 
     * // Get first 10 CalendarEvents
     * const calendarEvents = await prisma.calendarEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const calendarEventWithIdOnly = await prisma.calendarEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CalendarEventFindManyArgs>(args?: SelectSubset<T, CalendarEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CalendarEvent.
     * @param {CalendarEventCreateArgs} args - Arguments to create a CalendarEvent.
     * @example
     * // Create one CalendarEvent
     * const CalendarEvent = await prisma.calendarEvent.create({
     *   data: {
     *     // ... data to create a CalendarEvent
     *   }
     * })
     * 
     */
    create<T extends CalendarEventCreateArgs>(args: SelectSubset<T, CalendarEventCreateArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CalendarEvents.
     * @param {CalendarEventCreateManyArgs} args - Arguments to create many CalendarEvents.
     * @example
     * // Create many CalendarEvents
     * const calendarEvent = await prisma.calendarEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CalendarEventCreateManyArgs>(args?: SelectSubset<T, CalendarEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CalendarEvents and returns the data saved in the database.
     * @param {CalendarEventCreateManyAndReturnArgs} args - Arguments to create many CalendarEvents.
     * @example
     * // Create many CalendarEvents
     * const calendarEvent = await prisma.calendarEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CalendarEvents and only return the `id`
     * const calendarEventWithIdOnly = await prisma.calendarEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CalendarEventCreateManyAndReturnArgs>(args?: SelectSubset<T, CalendarEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CalendarEvent.
     * @param {CalendarEventDeleteArgs} args - Arguments to delete one CalendarEvent.
     * @example
     * // Delete one CalendarEvent
     * const CalendarEvent = await prisma.calendarEvent.delete({
     *   where: {
     *     // ... filter to delete one CalendarEvent
     *   }
     * })
     * 
     */
    delete<T extends CalendarEventDeleteArgs>(args: SelectSubset<T, CalendarEventDeleteArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CalendarEvent.
     * @param {CalendarEventUpdateArgs} args - Arguments to update one CalendarEvent.
     * @example
     * // Update one CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CalendarEventUpdateArgs>(args: SelectSubset<T, CalendarEventUpdateArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CalendarEvents.
     * @param {CalendarEventDeleteManyArgs} args - Arguments to filter CalendarEvents to delete.
     * @example
     * // Delete a few CalendarEvents
     * const { count } = await prisma.calendarEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CalendarEventDeleteManyArgs>(args?: SelectSubset<T, CalendarEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CalendarEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CalendarEvents
     * const calendarEvent = await prisma.calendarEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CalendarEventUpdateManyArgs>(args: SelectSubset<T, CalendarEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CalendarEvents and returns the data updated in the database.
     * @param {CalendarEventUpdateManyAndReturnArgs} args - Arguments to update many CalendarEvents.
     * @example
     * // Update many CalendarEvents
     * const calendarEvent = await prisma.calendarEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CalendarEvents and only return the `id`
     * const calendarEventWithIdOnly = await prisma.calendarEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CalendarEventUpdateManyAndReturnArgs>(args: SelectSubset<T, CalendarEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CalendarEvent.
     * @param {CalendarEventUpsertArgs} args - Arguments to update or create a CalendarEvent.
     * @example
     * // Update or create a CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.upsert({
     *   create: {
     *     // ... data to create a CalendarEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CalendarEvent we want to update
     *   }
     * })
     */
    upsert<T extends CalendarEventUpsertArgs>(args: SelectSubset<T, CalendarEventUpsertArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CalendarEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventCountArgs} args - Arguments to filter CalendarEvents to count.
     * @example
     * // Count the number of CalendarEvents
     * const count = await prisma.calendarEvent.count({
     *   where: {
     *     // ... the filter for the CalendarEvents we want to count
     *   }
     * })
    **/
    count<T extends CalendarEventCountArgs>(
      args?: Subset<T, CalendarEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CalendarEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CalendarEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CalendarEventAggregateArgs>(args: Subset<T, CalendarEventAggregateArgs>): Prisma.PrismaPromise<GetCalendarEventAggregateType<T>>

    /**
     * Group by CalendarEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CalendarEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CalendarEventGroupByArgs['orderBy'] }
        : { orderBy?: CalendarEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CalendarEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCalendarEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CalendarEvent model
   */
  readonly fields: CalendarEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CalendarEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CalendarEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attachments<T extends CalendarEvent$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, CalendarEvent$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CalendarEvent model
   */
  interface CalendarEventFieldRefs {
    readonly id: FieldRef<"CalendarEvent", 'String'>
    readonly userId: FieldRef<"CalendarEvent", 'String'>
    readonly title: FieldRef<"CalendarEvent", 'String'>
    readonly description: FieldRef<"CalendarEvent", 'String'>
    readonly startDate: FieldRef<"CalendarEvent", 'DateTime'>
    readonly endDate: FieldRef<"CalendarEvent", 'DateTime'>
    readonly allDay: FieldRef<"CalendarEvent", 'Boolean'>
    readonly location: FieldRef<"CalendarEvent", 'String'>
    readonly color: FieldRef<"CalendarEvent", 'String'>
    readonly isRecurring: FieldRef<"CalendarEvent", 'Boolean'>
    readonly recurrenceRule: FieldRef<"CalendarEvent", 'String'>
    readonly reminderBefore: FieldRef<"CalendarEvent", 'Int'>
    readonly createdAt: FieldRef<"CalendarEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"CalendarEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CalendarEvent findUnique
   */
  export type CalendarEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter, which CalendarEvent to fetch.
     */
    where: CalendarEventWhereUniqueInput
  }

  /**
   * CalendarEvent findUniqueOrThrow
   */
  export type CalendarEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter, which CalendarEvent to fetch.
     */
    where: CalendarEventWhereUniqueInput
  }

  /**
   * CalendarEvent findFirst
   */
  export type CalendarEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter, which CalendarEvent to fetch.
     */
    where?: CalendarEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CalendarEvents to fetch.
     */
    orderBy?: CalendarEventOrderByWithRelationInput | CalendarEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CalendarEvents.
     */
    cursor?: CalendarEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CalendarEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CalendarEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CalendarEvents.
     */
    distinct?: CalendarEventScalarFieldEnum | CalendarEventScalarFieldEnum[]
  }

  /**
   * CalendarEvent findFirstOrThrow
   */
  export type CalendarEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter, which CalendarEvent to fetch.
     */
    where?: CalendarEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CalendarEvents to fetch.
     */
    orderBy?: CalendarEventOrderByWithRelationInput | CalendarEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CalendarEvents.
     */
    cursor?: CalendarEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CalendarEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CalendarEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CalendarEvents.
     */
    distinct?: CalendarEventScalarFieldEnum | CalendarEventScalarFieldEnum[]
  }

  /**
   * CalendarEvent findMany
   */
  export type CalendarEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter, which CalendarEvents to fetch.
     */
    where?: CalendarEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CalendarEvents to fetch.
     */
    orderBy?: CalendarEventOrderByWithRelationInput | CalendarEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CalendarEvents.
     */
    cursor?: CalendarEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CalendarEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CalendarEvents.
     */
    skip?: number
    distinct?: CalendarEventScalarFieldEnum | CalendarEventScalarFieldEnum[]
  }

  /**
   * CalendarEvent create
   */
  export type CalendarEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * The data needed to create a CalendarEvent.
     */
    data: XOR<CalendarEventCreateInput, CalendarEventUncheckedCreateInput>
  }

  /**
   * CalendarEvent createMany
   */
  export type CalendarEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CalendarEvents.
     */
    data: CalendarEventCreateManyInput | CalendarEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CalendarEvent createManyAndReturn
   */
  export type CalendarEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * The data used to create many CalendarEvents.
     */
    data: CalendarEventCreateManyInput | CalendarEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CalendarEvent update
   */
  export type CalendarEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * The data needed to update a CalendarEvent.
     */
    data: XOR<CalendarEventUpdateInput, CalendarEventUncheckedUpdateInput>
    /**
     * Choose, which CalendarEvent to update.
     */
    where: CalendarEventWhereUniqueInput
  }

  /**
   * CalendarEvent updateMany
   */
  export type CalendarEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CalendarEvents.
     */
    data: XOR<CalendarEventUpdateManyMutationInput, CalendarEventUncheckedUpdateManyInput>
    /**
     * Filter which CalendarEvents to update
     */
    where?: CalendarEventWhereInput
    /**
     * Limit how many CalendarEvents to update.
     */
    limit?: number
  }

  /**
   * CalendarEvent updateManyAndReturn
   */
  export type CalendarEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * The data used to update CalendarEvents.
     */
    data: XOR<CalendarEventUpdateManyMutationInput, CalendarEventUncheckedUpdateManyInput>
    /**
     * Filter which CalendarEvents to update
     */
    where?: CalendarEventWhereInput
    /**
     * Limit how many CalendarEvents to update.
     */
    limit?: number
  }

  /**
   * CalendarEvent upsert
   */
  export type CalendarEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * The filter to search for the CalendarEvent to update in case it exists.
     */
    where: CalendarEventWhereUniqueInput
    /**
     * In case the CalendarEvent found by the `where` argument doesn't exist, create a new CalendarEvent with this data.
     */
    create: XOR<CalendarEventCreateInput, CalendarEventUncheckedCreateInput>
    /**
     * In case the CalendarEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CalendarEventUpdateInput, CalendarEventUncheckedUpdateInput>
  }

  /**
   * CalendarEvent delete
   */
  export type CalendarEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter which CalendarEvent to delete.
     */
    where: CalendarEventWhereUniqueInput
  }

  /**
   * CalendarEvent deleteMany
   */
  export type CalendarEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CalendarEvents to delete
     */
    where?: CalendarEventWhereInput
    /**
     * Limit how many CalendarEvents to delete.
     */
    limit?: number
  }

  /**
   * CalendarEvent.attachments
   */
  export type CalendarEvent$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttachment
     */
    select?: EventAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttachment
     */
    omit?: EventAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttachmentInclude<ExtArgs> | null
    where?: EventAttachmentWhereInput
    orderBy?: EventAttachmentOrderByWithRelationInput | EventAttachmentOrderByWithRelationInput[]
    cursor?: EventAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventAttachmentScalarFieldEnum | EventAttachmentScalarFieldEnum[]
  }

  /**
   * CalendarEvent without action
   */
  export type CalendarEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
  }


  /**
   * Model EventAttachment
   */

  export type AggregateEventAttachment = {
    _count: EventAttachmentCountAggregateOutputType | null
    _avg: EventAttachmentAvgAggregateOutputType | null
    _sum: EventAttachmentSumAggregateOutputType | null
    _min: EventAttachmentMinAggregateOutputType | null
    _max: EventAttachmentMaxAggregateOutputType | null
  }

  export type EventAttachmentAvgAggregateOutputType = {
    size: number | null
  }

  export type EventAttachmentSumAggregateOutputType = {
    size: number | null
  }

  export type EventAttachmentMinAggregateOutputType = {
    id: string | null
    eventId: string | null
    name: string | null
    type: string | null
    url: string | null
    size: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventAttachmentMaxAggregateOutputType = {
    id: string | null
    eventId: string | null
    name: string | null
    type: string | null
    url: string | null
    size: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventAttachmentCountAggregateOutputType = {
    id: number
    eventId: number
    name: number
    type: number
    url: number
    size: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EventAttachmentAvgAggregateInputType = {
    size?: true
  }

  export type EventAttachmentSumAggregateInputType = {
    size?: true
  }

  export type EventAttachmentMinAggregateInputType = {
    id?: true
    eventId?: true
    name?: true
    type?: true
    url?: true
    size?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventAttachmentMaxAggregateInputType = {
    id?: true
    eventId?: true
    name?: true
    type?: true
    url?: true
    size?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventAttachmentCountAggregateInputType = {
    id?: true
    eventId?: true
    name?: true
    type?: true
    url?: true
    size?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EventAttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventAttachment to aggregate.
     */
    where?: EventAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventAttachments to fetch.
     */
    orderBy?: EventAttachmentOrderByWithRelationInput | EventAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventAttachments
    **/
    _count?: true | EventAttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventAttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventAttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventAttachmentMaxAggregateInputType
  }

  export type GetEventAttachmentAggregateType<T extends EventAttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateEventAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventAttachment[P]>
      : GetScalarType<T[P], AggregateEventAttachment[P]>
  }




  export type EventAttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventAttachmentWhereInput
    orderBy?: EventAttachmentOrderByWithAggregationInput | EventAttachmentOrderByWithAggregationInput[]
    by: EventAttachmentScalarFieldEnum[] | EventAttachmentScalarFieldEnum
    having?: EventAttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventAttachmentCountAggregateInputType | true
    _avg?: EventAttachmentAvgAggregateInputType
    _sum?: EventAttachmentSumAggregateInputType
    _min?: EventAttachmentMinAggregateInputType
    _max?: EventAttachmentMaxAggregateInputType
  }

  export type EventAttachmentGroupByOutputType = {
    id: string
    eventId: string
    name: string
    type: string
    url: string
    size: number
    createdAt: Date
    updatedAt: Date
    _count: EventAttachmentCountAggregateOutputType | null
    _avg: EventAttachmentAvgAggregateOutputType | null
    _sum: EventAttachmentSumAggregateOutputType | null
    _min: EventAttachmentMinAggregateOutputType | null
    _max: EventAttachmentMaxAggregateOutputType | null
  }

  type GetEventAttachmentGroupByPayload<T extends EventAttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventAttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventAttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventAttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], EventAttachmentGroupByOutputType[P]>
        }
      >
    >


  export type EventAttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    name?: boolean
    type?: boolean
    url?: boolean
    size?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | CalendarEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventAttachment"]>

  export type EventAttachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    name?: boolean
    type?: boolean
    url?: boolean
    size?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | CalendarEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventAttachment"]>

  export type EventAttachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    name?: boolean
    type?: boolean
    url?: boolean
    size?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | CalendarEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventAttachment"]>

  export type EventAttachmentSelectScalar = {
    id?: boolean
    eventId?: boolean
    name?: boolean
    type?: boolean
    url?: boolean
    size?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EventAttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventId" | "name" | "type" | "url" | "size" | "createdAt" | "updatedAt", ExtArgs["result"]["eventAttachment"]>
  export type EventAttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | CalendarEventDefaultArgs<ExtArgs>
  }
  export type EventAttachmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | CalendarEventDefaultArgs<ExtArgs>
  }
  export type EventAttachmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | CalendarEventDefaultArgs<ExtArgs>
  }

  export type $EventAttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventAttachment"
    objects: {
      event: Prisma.$CalendarEventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventId: string
      name: string
      type: string
      url: string
      size: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["eventAttachment"]>
    composites: {}
  }

  type EventAttachmentGetPayload<S extends boolean | null | undefined | EventAttachmentDefaultArgs> = $Result.GetResult<Prisma.$EventAttachmentPayload, S>

  type EventAttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventAttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventAttachmentCountAggregateInputType | true
    }

  export interface EventAttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventAttachment'], meta: { name: 'EventAttachment' } }
    /**
     * Find zero or one EventAttachment that matches the filter.
     * @param {EventAttachmentFindUniqueArgs} args - Arguments to find a EventAttachment
     * @example
     * // Get one EventAttachment
     * const eventAttachment = await prisma.eventAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventAttachmentFindUniqueArgs>(args: SelectSubset<T, EventAttachmentFindUniqueArgs<ExtArgs>>): Prisma__EventAttachmentClient<$Result.GetResult<Prisma.$EventAttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventAttachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventAttachmentFindUniqueOrThrowArgs} args - Arguments to find a EventAttachment
     * @example
     * // Get one EventAttachment
     * const eventAttachment = await prisma.eventAttachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventAttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, EventAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventAttachmentClient<$Result.GetResult<Prisma.$EventAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAttachmentFindFirstArgs} args - Arguments to find a EventAttachment
     * @example
     * // Get one EventAttachment
     * const eventAttachment = await prisma.eventAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventAttachmentFindFirstArgs>(args?: SelectSubset<T, EventAttachmentFindFirstArgs<ExtArgs>>): Prisma__EventAttachmentClient<$Result.GetResult<Prisma.$EventAttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventAttachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAttachmentFindFirstOrThrowArgs} args - Arguments to find a EventAttachment
     * @example
     * // Get one EventAttachment
     * const eventAttachment = await prisma.eventAttachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventAttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, EventAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventAttachmentClient<$Result.GetResult<Prisma.$EventAttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventAttachments
     * const eventAttachments = await prisma.eventAttachment.findMany()
     * 
     * // Get first 10 EventAttachments
     * const eventAttachments = await prisma.eventAttachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventAttachmentWithIdOnly = await prisma.eventAttachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventAttachmentFindManyArgs>(args?: SelectSubset<T, EventAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventAttachment.
     * @param {EventAttachmentCreateArgs} args - Arguments to create a EventAttachment.
     * @example
     * // Create one EventAttachment
     * const EventAttachment = await prisma.eventAttachment.create({
     *   data: {
     *     // ... data to create a EventAttachment
     *   }
     * })
     * 
     */
    create<T extends EventAttachmentCreateArgs>(args: SelectSubset<T, EventAttachmentCreateArgs<ExtArgs>>): Prisma__EventAttachmentClient<$Result.GetResult<Prisma.$EventAttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventAttachments.
     * @param {EventAttachmentCreateManyArgs} args - Arguments to create many EventAttachments.
     * @example
     * // Create many EventAttachments
     * const eventAttachment = await prisma.eventAttachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventAttachmentCreateManyArgs>(args?: SelectSubset<T, EventAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventAttachments and returns the data saved in the database.
     * @param {EventAttachmentCreateManyAndReturnArgs} args - Arguments to create many EventAttachments.
     * @example
     * // Create many EventAttachments
     * const eventAttachment = await prisma.eventAttachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventAttachments and only return the `id`
     * const eventAttachmentWithIdOnly = await prisma.eventAttachment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventAttachmentCreateManyAndReturnArgs>(args?: SelectSubset<T, EventAttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventAttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventAttachment.
     * @param {EventAttachmentDeleteArgs} args - Arguments to delete one EventAttachment.
     * @example
     * // Delete one EventAttachment
     * const EventAttachment = await prisma.eventAttachment.delete({
     *   where: {
     *     // ... filter to delete one EventAttachment
     *   }
     * })
     * 
     */
    delete<T extends EventAttachmentDeleteArgs>(args: SelectSubset<T, EventAttachmentDeleteArgs<ExtArgs>>): Prisma__EventAttachmentClient<$Result.GetResult<Prisma.$EventAttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventAttachment.
     * @param {EventAttachmentUpdateArgs} args - Arguments to update one EventAttachment.
     * @example
     * // Update one EventAttachment
     * const eventAttachment = await prisma.eventAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventAttachmentUpdateArgs>(args: SelectSubset<T, EventAttachmentUpdateArgs<ExtArgs>>): Prisma__EventAttachmentClient<$Result.GetResult<Prisma.$EventAttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventAttachments.
     * @param {EventAttachmentDeleteManyArgs} args - Arguments to filter EventAttachments to delete.
     * @example
     * // Delete a few EventAttachments
     * const { count } = await prisma.eventAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventAttachmentDeleteManyArgs>(args?: SelectSubset<T, EventAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventAttachments
     * const eventAttachment = await prisma.eventAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventAttachmentUpdateManyArgs>(args: SelectSubset<T, EventAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventAttachments and returns the data updated in the database.
     * @param {EventAttachmentUpdateManyAndReturnArgs} args - Arguments to update many EventAttachments.
     * @example
     * // Update many EventAttachments
     * const eventAttachment = await prisma.eventAttachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventAttachments and only return the `id`
     * const eventAttachmentWithIdOnly = await prisma.eventAttachment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventAttachmentUpdateManyAndReturnArgs>(args: SelectSubset<T, EventAttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventAttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventAttachment.
     * @param {EventAttachmentUpsertArgs} args - Arguments to update or create a EventAttachment.
     * @example
     * // Update or create a EventAttachment
     * const eventAttachment = await prisma.eventAttachment.upsert({
     *   create: {
     *     // ... data to create a EventAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventAttachment we want to update
     *   }
     * })
     */
    upsert<T extends EventAttachmentUpsertArgs>(args: SelectSubset<T, EventAttachmentUpsertArgs<ExtArgs>>): Prisma__EventAttachmentClient<$Result.GetResult<Prisma.$EventAttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAttachmentCountArgs} args - Arguments to filter EventAttachments to count.
     * @example
     * // Count the number of EventAttachments
     * const count = await prisma.eventAttachment.count({
     *   where: {
     *     // ... the filter for the EventAttachments we want to count
     *   }
     * })
    **/
    count<T extends EventAttachmentCountArgs>(
      args?: Subset<T, EventAttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventAttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAttachmentAggregateArgs>(args: Subset<T, EventAttachmentAggregateArgs>): Prisma.PrismaPromise<GetEventAttachmentAggregateType<T>>

    /**
     * Group by EventAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventAttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventAttachmentGroupByArgs['orderBy'] }
        : { orderBy?: EventAttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventAttachment model
   */
  readonly fields: EventAttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventAttachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventAttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends CalendarEventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CalendarEventDefaultArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EventAttachment model
   */
  interface EventAttachmentFieldRefs {
    readonly id: FieldRef<"EventAttachment", 'String'>
    readonly eventId: FieldRef<"EventAttachment", 'String'>
    readonly name: FieldRef<"EventAttachment", 'String'>
    readonly type: FieldRef<"EventAttachment", 'String'>
    readonly url: FieldRef<"EventAttachment", 'String'>
    readonly size: FieldRef<"EventAttachment", 'Int'>
    readonly createdAt: FieldRef<"EventAttachment", 'DateTime'>
    readonly updatedAt: FieldRef<"EventAttachment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EventAttachment findUnique
   */
  export type EventAttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttachment
     */
    select?: EventAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttachment
     */
    omit?: EventAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which EventAttachment to fetch.
     */
    where: EventAttachmentWhereUniqueInput
  }

  /**
   * EventAttachment findUniqueOrThrow
   */
  export type EventAttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttachment
     */
    select?: EventAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttachment
     */
    omit?: EventAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which EventAttachment to fetch.
     */
    where: EventAttachmentWhereUniqueInput
  }

  /**
   * EventAttachment findFirst
   */
  export type EventAttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttachment
     */
    select?: EventAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttachment
     */
    omit?: EventAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which EventAttachment to fetch.
     */
    where?: EventAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventAttachments to fetch.
     */
    orderBy?: EventAttachmentOrderByWithRelationInput | EventAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventAttachments.
     */
    cursor?: EventAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventAttachments.
     */
    distinct?: EventAttachmentScalarFieldEnum | EventAttachmentScalarFieldEnum[]
  }

  /**
   * EventAttachment findFirstOrThrow
   */
  export type EventAttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttachment
     */
    select?: EventAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttachment
     */
    omit?: EventAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which EventAttachment to fetch.
     */
    where?: EventAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventAttachments to fetch.
     */
    orderBy?: EventAttachmentOrderByWithRelationInput | EventAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventAttachments.
     */
    cursor?: EventAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventAttachments.
     */
    distinct?: EventAttachmentScalarFieldEnum | EventAttachmentScalarFieldEnum[]
  }

  /**
   * EventAttachment findMany
   */
  export type EventAttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttachment
     */
    select?: EventAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttachment
     */
    omit?: EventAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which EventAttachments to fetch.
     */
    where?: EventAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventAttachments to fetch.
     */
    orderBy?: EventAttachmentOrderByWithRelationInput | EventAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventAttachments.
     */
    cursor?: EventAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventAttachments.
     */
    skip?: number
    distinct?: EventAttachmentScalarFieldEnum | EventAttachmentScalarFieldEnum[]
  }

  /**
   * EventAttachment create
   */
  export type EventAttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttachment
     */
    select?: EventAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttachment
     */
    omit?: EventAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a EventAttachment.
     */
    data: XOR<EventAttachmentCreateInput, EventAttachmentUncheckedCreateInput>
  }

  /**
   * EventAttachment createMany
   */
  export type EventAttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventAttachments.
     */
    data: EventAttachmentCreateManyInput | EventAttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventAttachment createManyAndReturn
   */
  export type EventAttachmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttachment
     */
    select?: EventAttachmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttachment
     */
    omit?: EventAttachmentOmit<ExtArgs> | null
    /**
     * The data used to create many EventAttachments.
     */
    data: EventAttachmentCreateManyInput | EventAttachmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttachmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventAttachment update
   */
  export type EventAttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttachment
     */
    select?: EventAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttachment
     */
    omit?: EventAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a EventAttachment.
     */
    data: XOR<EventAttachmentUpdateInput, EventAttachmentUncheckedUpdateInput>
    /**
     * Choose, which EventAttachment to update.
     */
    where: EventAttachmentWhereUniqueInput
  }

  /**
   * EventAttachment updateMany
   */
  export type EventAttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventAttachments.
     */
    data: XOR<EventAttachmentUpdateManyMutationInput, EventAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which EventAttachments to update
     */
    where?: EventAttachmentWhereInput
    /**
     * Limit how many EventAttachments to update.
     */
    limit?: number
  }

  /**
   * EventAttachment updateManyAndReturn
   */
  export type EventAttachmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttachment
     */
    select?: EventAttachmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttachment
     */
    omit?: EventAttachmentOmit<ExtArgs> | null
    /**
     * The data used to update EventAttachments.
     */
    data: XOR<EventAttachmentUpdateManyMutationInput, EventAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which EventAttachments to update
     */
    where?: EventAttachmentWhereInput
    /**
     * Limit how many EventAttachments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttachmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventAttachment upsert
   */
  export type EventAttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttachment
     */
    select?: EventAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttachment
     */
    omit?: EventAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the EventAttachment to update in case it exists.
     */
    where: EventAttachmentWhereUniqueInput
    /**
     * In case the EventAttachment found by the `where` argument doesn't exist, create a new EventAttachment with this data.
     */
    create: XOR<EventAttachmentCreateInput, EventAttachmentUncheckedCreateInput>
    /**
     * In case the EventAttachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventAttachmentUpdateInput, EventAttachmentUncheckedUpdateInput>
  }

  /**
   * EventAttachment delete
   */
  export type EventAttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttachment
     */
    select?: EventAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttachment
     */
    omit?: EventAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttachmentInclude<ExtArgs> | null
    /**
     * Filter which EventAttachment to delete.
     */
    where: EventAttachmentWhereUniqueInput
  }

  /**
   * EventAttachment deleteMany
   */
  export type EventAttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventAttachments to delete
     */
    where?: EventAttachmentWhereInput
    /**
     * Limit how many EventAttachments to delete.
     */
    limit?: number
  }

  /**
   * EventAttachment without action
   */
  export type EventAttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAttachment
     */
    select?: EventAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventAttachment
     */
    omit?: EventAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventAttachmentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FitbitActivityScalarFieldEnum: {
    id: 'id',
    date: 'date',
    duration: 'duration',
    calories: 'calories',
    steps: 'steps',
    distance: 'distance',
    lastUpdated: 'lastUpdated',
    createdAt: 'createdAt',
    manual: 'manual'
  };

  export type FitbitActivityScalarFieldEnum = (typeof FitbitActivityScalarFieldEnum)[keyof typeof FitbitActivityScalarFieldEnum]


  export const UserProfileScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    name: 'name',
    age: 'age',
    weightKg: 'weightKg',
    heightCm: 'heightCm',
    avatarUrl: 'avatarUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserProfileScalarFieldEnum = (typeof UserProfileScalarFieldEnum)[keyof typeof UserProfileScalarFieldEnum]


  export const GoalScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    type: 'type',
    target: 'target',
    unit: 'unit',
    progress: 'progress',
    completed: 'completed',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GoalScalarFieldEnum = (typeof GoalScalarFieldEnum)[keyof typeof GoalScalarFieldEnum]


  export const CalendarEventScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    description: 'description',
    startDate: 'startDate',
    endDate: 'endDate',
    allDay: 'allDay',
    location: 'location',
    color: 'color',
    isRecurring: 'isRecurring',
    recurrenceRule: 'recurrenceRule',
    reminderBefore: 'reminderBefore',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CalendarEventScalarFieldEnum = (typeof CalendarEventScalarFieldEnum)[keyof typeof CalendarEventScalarFieldEnum]


  export const EventAttachmentScalarFieldEnum: {
    id: 'id',
    eventId: 'eventId',
    name: 'name',
    type: 'type',
    url: 'url',
    size: 'size',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EventAttachmentScalarFieldEnum = (typeof EventAttachmentScalarFieldEnum)[keyof typeof EventAttachmentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type FitbitActivityWhereInput = {
    AND?: FitbitActivityWhereInput | FitbitActivityWhereInput[]
    OR?: FitbitActivityWhereInput[]
    NOT?: FitbitActivityWhereInput | FitbitActivityWhereInput[]
    id?: StringFilter<"FitbitActivity"> | string
    date?: DateTimeFilter<"FitbitActivity"> | Date | string
    duration?: IntFilter<"FitbitActivity"> | number
    calories?: IntFilter<"FitbitActivity"> | number
    steps?: IntFilter<"FitbitActivity"> | number
    distance?: FloatFilter<"FitbitActivity"> | number
    lastUpdated?: DateTimeNullableFilter<"FitbitActivity"> | Date | string | null
    createdAt?: DateTimeFilter<"FitbitActivity"> | Date | string
    manual?: BoolFilter<"FitbitActivity"> | boolean
  }

  export type FitbitActivityOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    calories?: SortOrder
    steps?: SortOrder
    distance?: SortOrder
    lastUpdated?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    manual?: SortOrder
  }

  export type FitbitActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    date?: Date | string
    AND?: FitbitActivityWhereInput | FitbitActivityWhereInput[]
    OR?: FitbitActivityWhereInput[]
    NOT?: FitbitActivityWhereInput | FitbitActivityWhereInput[]
    duration?: IntFilter<"FitbitActivity"> | number
    calories?: IntFilter<"FitbitActivity"> | number
    steps?: IntFilter<"FitbitActivity"> | number
    distance?: FloatFilter<"FitbitActivity"> | number
    lastUpdated?: DateTimeNullableFilter<"FitbitActivity"> | Date | string | null
    createdAt?: DateTimeFilter<"FitbitActivity"> | Date | string
    manual?: BoolFilter<"FitbitActivity"> | boolean
  }, "id" | "date">

  export type FitbitActivityOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    calories?: SortOrder
    steps?: SortOrder
    distance?: SortOrder
    lastUpdated?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    manual?: SortOrder
    _count?: FitbitActivityCountOrderByAggregateInput
    _avg?: FitbitActivityAvgOrderByAggregateInput
    _max?: FitbitActivityMaxOrderByAggregateInput
    _min?: FitbitActivityMinOrderByAggregateInput
    _sum?: FitbitActivitySumOrderByAggregateInput
  }

  export type FitbitActivityScalarWhereWithAggregatesInput = {
    AND?: FitbitActivityScalarWhereWithAggregatesInput | FitbitActivityScalarWhereWithAggregatesInput[]
    OR?: FitbitActivityScalarWhereWithAggregatesInput[]
    NOT?: FitbitActivityScalarWhereWithAggregatesInput | FitbitActivityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FitbitActivity"> | string
    date?: DateTimeWithAggregatesFilter<"FitbitActivity"> | Date | string
    duration?: IntWithAggregatesFilter<"FitbitActivity"> | number
    calories?: IntWithAggregatesFilter<"FitbitActivity"> | number
    steps?: IntWithAggregatesFilter<"FitbitActivity"> | number
    distance?: FloatWithAggregatesFilter<"FitbitActivity"> | number
    lastUpdated?: DateTimeNullableWithAggregatesFilter<"FitbitActivity"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FitbitActivity"> | Date | string
    manual?: BoolWithAggregatesFilter<"FitbitActivity"> | boolean
  }

  export type UserProfileWhereInput = {
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    id?: StringFilter<"UserProfile"> | string
    username?: StringFilter<"UserProfile"> | string
    password?: StringFilter<"UserProfile"> | string
    name?: StringFilter<"UserProfile"> | string
    age?: IntNullableFilter<"UserProfile"> | number | null
    weightKg?: FloatNullableFilter<"UserProfile"> | number | null
    heightCm?: FloatNullableFilter<"UserProfile"> | number | null
    avatarUrl?: StringNullableFilter<"UserProfile"> | string | null
    createdAt?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
  }

  export type UserProfileOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    age?: SortOrderInput | SortOrder
    weightKg?: SortOrderInput | SortOrder
    heightCm?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    password?: StringFilter<"UserProfile"> | string
    name?: StringFilter<"UserProfile"> | string
    age?: IntNullableFilter<"UserProfile"> | number | null
    weightKg?: FloatNullableFilter<"UserProfile"> | number | null
    heightCm?: FloatNullableFilter<"UserProfile"> | number | null
    avatarUrl?: StringNullableFilter<"UserProfile"> | string | null
    createdAt?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
  }, "id" | "username">

  export type UserProfileOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    age?: SortOrderInput | SortOrder
    weightKg?: SortOrderInput | SortOrder
    heightCm?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserProfileCountOrderByAggregateInput
    _avg?: UserProfileAvgOrderByAggregateInput
    _max?: UserProfileMaxOrderByAggregateInput
    _min?: UserProfileMinOrderByAggregateInput
    _sum?: UserProfileSumOrderByAggregateInput
  }

  export type UserProfileScalarWhereWithAggregatesInput = {
    AND?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    OR?: UserProfileScalarWhereWithAggregatesInput[]
    NOT?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserProfile"> | string
    username?: StringWithAggregatesFilter<"UserProfile"> | string
    password?: StringWithAggregatesFilter<"UserProfile"> | string
    name?: StringWithAggregatesFilter<"UserProfile"> | string
    age?: IntNullableWithAggregatesFilter<"UserProfile"> | number | null
    weightKg?: FloatNullableWithAggregatesFilter<"UserProfile"> | number | null
    heightCm?: FloatNullableWithAggregatesFilter<"UserProfile"> | number | null
    avatarUrl?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
  }

  export type GoalWhereInput = {
    AND?: GoalWhereInput | GoalWhereInput[]
    OR?: GoalWhereInput[]
    NOT?: GoalWhereInput | GoalWhereInput[]
    id?: StringFilter<"Goal"> | string
    userId?: StringFilter<"Goal"> | string
    title?: StringFilter<"Goal"> | string
    type?: StringFilter<"Goal"> | string
    target?: FloatFilter<"Goal"> | number
    unit?: StringFilter<"Goal"> | string
    progress?: FloatFilter<"Goal"> | number
    completed?: BoolFilter<"Goal"> | boolean
    startDate?: DateTimeFilter<"Goal"> | Date | string
    endDate?: DateTimeFilter<"Goal"> | Date | string
    createdAt?: DateTimeFilter<"Goal"> | Date | string
    updatedAt?: DateTimeFilter<"Goal"> | Date | string
  }

  export type GoalOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    type?: SortOrder
    target?: SortOrder
    unit?: SortOrder
    progress?: SortOrder
    completed?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GoalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GoalWhereInput | GoalWhereInput[]
    OR?: GoalWhereInput[]
    NOT?: GoalWhereInput | GoalWhereInput[]
    userId?: StringFilter<"Goal"> | string
    title?: StringFilter<"Goal"> | string
    type?: StringFilter<"Goal"> | string
    target?: FloatFilter<"Goal"> | number
    unit?: StringFilter<"Goal"> | string
    progress?: FloatFilter<"Goal"> | number
    completed?: BoolFilter<"Goal"> | boolean
    startDate?: DateTimeFilter<"Goal"> | Date | string
    endDate?: DateTimeFilter<"Goal"> | Date | string
    createdAt?: DateTimeFilter<"Goal"> | Date | string
    updatedAt?: DateTimeFilter<"Goal"> | Date | string
  }, "id">

  export type GoalOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    type?: SortOrder
    target?: SortOrder
    unit?: SortOrder
    progress?: SortOrder
    completed?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GoalCountOrderByAggregateInput
    _avg?: GoalAvgOrderByAggregateInput
    _max?: GoalMaxOrderByAggregateInput
    _min?: GoalMinOrderByAggregateInput
    _sum?: GoalSumOrderByAggregateInput
  }

  export type GoalScalarWhereWithAggregatesInput = {
    AND?: GoalScalarWhereWithAggregatesInput | GoalScalarWhereWithAggregatesInput[]
    OR?: GoalScalarWhereWithAggregatesInput[]
    NOT?: GoalScalarWhereWithAggregatesInput | GoalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Goal"> | string
    userId?: StringWithAggregatesFilter<"Goal"> | string
    title?: StringWithAggregatesFilter<"Goal"> | string
    type?: StringWithAggregatesFilter<"Goal"> | string
    target?: FloatWithAggregatesFilter<"Goal"> | number
    unit?: StringWithAggregatesFilter<"Goal"> | string
    progress?: FloatWithAggregatesFilter<"Goal"> | number
    completed?: BoolWithAggregatesFilter<"Goal"> | boolean
    startDate?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
  }

  export type CalendarEventWhereInput = {
    AND?: CalendarEventWhereInput | CalendarEventWhereInput[]
    OR?: CalendarEventWhereInput[]
    NOT?: CalendarEventWhereInput | CalendarEventWhereInput[]
    id?: StringFilter<"CalendarEvent"> | string
    userId?: StringFilter<"CalendarEvent"> | string
    title?: StringFilter<"CalendarEvent"> | string
    description?: StringNullableFilter<"CalendarEvent"> | string | null
    startDate?: DateTimeFilter<"CalendarEvent"> | Date | string
    endDate?: DateTimeFilter<"CalendarEvent"> | Date | string
    allDay?: BoolFilter<"CalendarEvent"> | boolean
    location?: StringNullableFilter<"CalendarEvent"> | string | null
    color?: StringNullableFilter<"CalendarEvent"> | string | null
    isRecurring?: BoolFilter<"CalendarEvent"> | boolean
    recurrenceRule?: StringNullableFilter<"CalendarEvent"> | string | null
    reminderBefore?: IntNullableFilter<"CalendarEvent"> | number | null
    createdAt?: DateTimeFilter<"CalendarEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CalendarEvent"> | Date | string
    attachments?: EventAttachmentListRelationFilter
  }

  export type CalendarEventOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    allDay?: SortOrder
    location?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    isRecurring?: SortOrder
    recurrenceRule?: SortOrderInput | SortOrder
    reminderBefore?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attachments?: EventAttachmentOrderByRelationAggregateInput
  }

  export type CalendarEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CalendarEventWhereInput | CalendarEventWhereInput[]
    OR?: CalendarEventWhereInput[]
    NOT?: CalendarEventWhereInput | CalendarEventWhereInput[]
    userId?: StringFilter<"CalendarEvent"> | string
    title?: StringFilter<"CalendarEvent"> | string
    description?: StringNullableFilter<"CalendarEvent"> | string | null
    startDate?: DateTimeFilter<"CalendarEvent"> | Date | string
    endDate?: DateTimeFilter<"CalendarEvent"> | Date | string
    allDay?: BoolFilter<"CalendarEvent"> | boolean
    location?: StringNullableFilter<"CalendarEvent"> | string | null
    color?: StringNullableFilter<"CalendarEvent"> | string | null
    isRecurring?: BoolFilter<"CalendarEvent"> | boolean
    recurrenceRule?: StringNullableFilter<"CalendarEvent"> | string | null
    reminderBefore?: IntNullableFilter<"CalendarEvent"> | number | null
    createdAt?: DateTimeFilter<"CalendarEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CalendarEvent"> | Date | string
    attachments?: EventAttachmentListRelationFilter
  }, "id">

  export type CalendarEventOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    allDay?: SortOrder
    location?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    isRecurring?: SortOrder
    recurrenceRule?: SortOrderInput | SortOrder
    reminderBefore?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CalendarEventCountOrderByAggregateInput
    _avg?: CalendarEventAvgOrderByAggregateInput
    _max?: CalendarEventMaxOrderByAggregateInput
    _min?: CalendarEventMinOrderByAggregateInput
    _sum?: CalendarEventSumOrderByAggregateInput
  }

  export type CalendarEventScalarWhereWithAggregatesInput = {
    AND?: CalendarEventScalarWhereWithAggregatesInput | CalendarEventScalarWhereWithAggregatesInput[]
    OR?: CalendarEventScalarWhereWithAggregatesInput[]
    NOT?: CalendarEventScalarWhereWithAggregatesInput | CalendarEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CalendarEvent"> | string
    userId?: StringWithAggregatesFilter<"CalendarEvent"> | string
    title?: StringWithAggregatesFilter<"CalendarEvent"> | string
    description?: StringNullableWithAggregatesFilter<"CalendarEvent"> | string | null
    startDate?: DateTimeWithAggregatesFilter<"CalendarEvent"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"CalendarEvent"> | Date | string
    allDay?: BoolWithAggregatesFilter<"CalendarEvent"> | boolean
    location?: StringNullableWithAggregatesFilter<"CalendarEvent"> | string | null
    color?: StringNullableWithAggregatesFilter<"CalendarEvent"> | string | null
    isRecurring?: BoolWithAggregatesFilter<"CalendarEvent"> | boolean
    recurrenceRule?: StringNullableWithAggregatesFilter<"CalendarEvent"> | string | null
    reminderBefore?: IntNullableWithAggregatesFilter<"CalendarEvent"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"CalendarEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CalendarEvent"> | Date | string
  }

  export type EventAttachmentWhereInput = {
    AND?: EventAttachmentWhereInput | EventAttachmentWhereInput[]
    OR?: EventAttachmentWhereInput[]
    NOT?: EventAttachmentWhereInput | EventAttachmentWhereInput[]
    id?: StringFilter<"EventAttachment"> | string
    eventId?: StringFilter<"EventAttachment"> | string
    name?: StringFilter<"EventAttachment"> | string
    type?: StringFilter<"EventAttachment"> | string
    url?: StringFilter<"EventAttachment"> | string
    size?: IntFilter<"EventAttachment"> | number
    createdAt?: DateTimeFilter<"EventAttachment"> | Date | string
    updatedAt?: DateTimeFilter<"EventAttachment"> | Date | string
    event?: XOR<CalendarEventScalarRelationFilter, CalendarEventWhereInput>
  }

  export type EventAttachmentOrderByWithRelationInput = {
    id?: SortOrder
    eventId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    url?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    event?: CalendarEventOrderByWithRelationInput
  }

  export type EventAttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EventAttachmentWhereInput | EventAttachmentWhereInput[]
    OR?: EventAttachmentWhereInput[]
    NOT?: EventAttachmentWhereInput | EventAttachmentWhereInput[]
    eventId?: StringFilter<"EventAttachment"> | string
    name?: StringFilter<"EventAttachment"> | string
    type?: StringFilter<"EventAttachment"> | string
    url?: StringFilter<"EventAttachment"> | string
    size?: IntFilter<"EventAttachment"> | number
    createdAt?: DateTimeFilter<"EventAttachment"> | Date | string
    updatedAt?: DateTimeFilter<"EventAttachment"> | Date | string
    event?: XOR<CalendarEventScalarRelationFilter, CalendarEventWhereInput>
  }, "id">

  export type EventAttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    eventId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    url?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EventAttachmentCountOrderByAggregateInput
    _avg?: EventAttachmentAvgOrderByAggregateInput
    _max?: EventAttachmentMaxOrderByAggregateInput
    _min?: EventAttachmentMinOrderByAggregateInput
    _sum?: EventAttachmentSumOrderByAggregateInput
  }

  export type EventAttachmentScalarWhereWithAggregatesInput = {
    AND?: EventAttachmentScalarWhereWithAggregatesInput | EventAttachmentScalarWhereWithAggregatesInput[]
    OR?: EventAttachmentScalarWhereWithAggregatesInput[]
    NOT?: EventAttachmentScalarWhereWithAggregatesInput | EventAttachmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EventAttachment"> | string
    eventId?: StringWithAggregatesFilter<"EventAttachment"> | string
    name?: StringWithAggregatesFilter<"EventAttachment"> | string
    type?: StringWithAggregatesFilter<"EventAttachment"> | string
    url?: StringWithAggregatesFilter<"EventAttachment"> | string
    size?: IntWithAggregatesFilter<"EventAttachment"> | number
    createdAt?: DateTimeWithAggregatesFilter<"EventAttachment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EventAttachment"> | Date | string
  }

  export type FitbitActivityCreateInput = {
    id?: string
    date: Date | string
    duration: number
    calories: number
    steps: number
    distance: number
    lastUpdated?: Date | string | null
    createdAt?: Date | string
    manual?: boolean
  }

  export type FitbitActivityUncheckedCreateInput = {
    id?: string
    date: Date | string
    duration: number
    calories: number
    steps: number
    distance: number
    lastUpdated?: Date | string | null
    createdAt?: Date | string
    manual?: boolean
  }

  export type FitbitActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    calories?: IntFieldUpdateOperationsInput | number
    steps?: IntFieldUpdateOperationsInput | number
    distance?: FloatFieldUpdateOperationsInput | number
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manual?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FitbitActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    calories?: IntFieldUpdateOperationsInput | number
    steps?: IntFieldUpdateOperationsInput | number
    distance?: FloatFieldUpdateOperationsInput | number
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manual?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FitbitActivityCreateManyInput = {
    id?: string
    date: Date | string
    duration: number
    calories: number
    steps: number
    distance: number
    lastUpdated?: Date | string | null
    createdAt?: Date | string
    manual?: boolean
  }

  export type FitbitActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    calories?: IntFieldUpdateOperationsInput | number
    steps?: IntFieldUpdateOperationsInput | number
    distance?: FloatFieldUpdateOperationsInput | number
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manual?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FitbitActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    calories?: IntFieldUpdateOperationsInput | number
    steps?: IntFieldUpdateOperationsInput | number
    distance?: FloatFieldUpdateOperationsInput | number
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manual?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserProfileCreateInput = {
    id?: string
    username: string
    password: string
    name: string
    age?: number | null
    weightKg?: number | null
    heightCm?: number | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileUncheckedCreateInput = {
    id?: string
    username: string
    password: string
    name: string
    age?: number | null
    weightKg?: number | null
    heightCm?: number | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileCreateManyInput = {
    id?: string
    username: string
    password: string
    name: string
    age?: number | null
    weightKg?: number | null
    heightCm?: number | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weightKg?: NullableFloatFieldUpdateOperationsInput | number | null
    heightCm?: NullableFloatFieldUpdateOperationsInput | number | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalCreateInput = {
    id?: string
    userId: string
    title: string
    type: string
    target: number
    unit: string
    progress?: number
    completed?: boolean
    startDate?: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GoalUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    type: string
    target: number
    unit: string
    progress?: number
    completed?: boolean
    startDate?: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GoalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    target?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    target?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalCreateManyInput = {
    id?: string
    userId: string
    title: string
    type: string
    target: number
    unit: string
    progress?: number
    completed?: boolean
    startDate?: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GoalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    target?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    target?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalendarEventCreateInput = {
    id?: string
    userId: string
    title: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    allDay?: boolean
    location?: string | null
    color?: string | null
    isRecurring?: boolean
    recurrenceRule?: string | null
    reminderBefore?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: EventAttachmentCreateNestedManyWithoutEventInput
  }

  export type CalendarEventUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    allDay?: boolean
    location?: string | null
    color?: string | null
    isRecurring?: boolean
    recurrenceRule?: string | null
    reminderBefore?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: EventAttachmentUncheckedCreateNestedManyWithoutEventInput
  }

  export type CalendarEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    allDay?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrenceRule?: NullableStringFieldUpdateOperationsInput | string | null
    reminderBefore?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: EventAttachmentUpdateManyWithoutEventNestedInput
  }

  export type CalendarEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    allDay?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrenceRule?: NullableStringFieldUpdateOperationsInput | string | null
    reminderBefore?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: EventAttachmentUncheckedUpdateManyWithoutEventNestedInput
  }

  export type CalendarEventCreateManyInput = {
    id?: string
    userId: string
    title: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    allDay?: boolean
    location?: string | null
    color?: string | null
    isRecurring?: boolean
    recurrenceRule?: string | null
    reminderBefore?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CalendarEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    allDay?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrenceRule?: NullableStringFieldUpdateOperationsInput | string | null
    reminderBefore?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalendarEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    allDay?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrenceRule?: NullableStringFieldUpdateOperationsInput | string | null
    reminderBefore?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventAttachmentCreateInput = {
    id?: string
    name: string
    type: string
    url: string
    size: number
    createdAt?: Date | string
    updatedAt?: Date | string
    event: CalendarEventCreateNestedOneWithoutAttachmentsInput
  }

  export type EventAttachmentUncheckedCreateInput = {
    id?: string
    eventId: string
    name: string
    type: string
    url: string
    size: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventAttachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: CalendarEventUpdateOneRequiredWithoutAttachmentsNestedInput
  }

  export type EventAttachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventAttachmentCreateManyInput = {
    id?: string
    eventId: string
    name: string
    type: string
    url: string
    size: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventAttachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventAttachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FitbitActivityCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    calories?: SortOrder
    steps?: SortOrder
    distance?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    manual?: SortOrder
  }

  export type FitbitActivityAvgOrderByAggregateInput = {
    duration?: SortOrder
    calories?: SortOrder
    steps?: SortOrder
    distance?: SortOrder
  }

  export type FitbitActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    calories?: SortOrder
    steps?: SortOrder
    distance?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    manual?: SortOrder
  }

  export type FitbitActivityMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    calories?: SortOrder
    steps?: SortOrder
    distance?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    manual?: SortOrder
  }

  export type FitbitActivitySumOrderByAggregateInput = {
    duration?: SortOrder
    calories?: SortOrder
    steps?: SortOrder
    distance?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserProfileCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    age?: SortOrder
    weightKg?: SortOrder
    heightCm?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileAvgOrderByAggregateInput = {
    age?: SortOrder
    weightKg?: SortOrder
    heightCm?: SortOrder
  }

  export type UserProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    age?: SortOrder
    weightKg?: SortOrder
    heightCm?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    age?: SortOrder
    weightKg?: SortOrder
    heightCm?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileSumOrderByAggregateInput = {
    age?: SortOrder
    weightKg?: SortOrder
    heightCm?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type GoalCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    type?: SortOrder
    target?: SortOrder
    unit?: SortOrder
    progress?: SortOrder
    completed?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GoalAvgOrderByAggregateInput = {
    target?: SortOrder
    progress?: SortOrder
  }

  export type GoalMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    type?: SortOrder
    target?: SortOrder
    unit?: SortOrder
    progress?: SortOrder
    completed?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GoalMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    type?: SortOrder
    target?: SortOrder
    unit?: SortOrder
    progress?: SortOrder
    completed?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GoalSumOrderByAggregateInput = {
    target?: SortOrder
    progress?: SortOrder
  }

  export type EventAttachmentListRelationFilter = {
    every?: EventAttachmentWhereInput
    some?: EventAttachmentWhereInput
    none?: EventAttachmentWhereInput
  }

  export type EventAttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CalendarEventCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    allDay?: SortOrder
    location?: SortOrder
    color?: SortOrder
    isRecurring?: SortOrder
    recurrenceRule?: SortOrder
    reminderBefore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CalendarEventAvgOrderByAggregateInput = {
    reminderBefore?: SortOrder
  }

  export type CalendarEventMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    allDay?: SortOrder
    location?: SortOrder
    color?: SortOrder
    isRecurring?: SortOrder
    recurrenceRule?: SortOrder
    reminderBefore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CalendarEventMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    allDay?: SortOrder
    location?: SortOrder
    color?: SortOrder
    isRecurring?: SortOrder
    recurrenceRule?: SortOrder
    reminderBefore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CalendarEventSumOrderByAggregateInput = {
    reminderBefore?: SortOrder
  }

  export type CalendarEventScalarRelationFilter = {
    is?: CalendarEventWhereInput
    isNot?: CalendarEventWhereInput
  }

  export type EventAttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    url?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventAttachmentAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type EventAttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    url?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventAttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    url?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventAttachmentSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EventAttachmentCreateNestedManyWithoutEventInput = {
    create?: XOR<EventAttachmentCreateWithoutEventInput, EventAttachmentUncheckedCreateWithoutEventInput> | EventAttachmentCreateWithoutEventInput[] | EventAttachmentUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventAttachmentCreateOrConnectWithoutEventInput | EventAttachmentCreateOrConnectWithoutEventInput[]
    createMany?: EventAttachmentCreateManyEventInputEnvelope
    connect?: EventAttachmentWhereUniqueInput | EventAttachmentWhereUniqueInput[]
  }

  export type EventAttachmentUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<EventAttachmentCreateWithoutEventInput, EventAttachmentUncheckedCreateWithoutEventInput> | EventAttachmentCreateWithoutEventInput[] | EventAttachmentUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventAttachmentCreateOrConnectWithoutEventInput | EventAttachmentCreateOrConnectWithoutEventInput[]
    createMany?: EventAttachmentCreateManyEventInputEnvelope
    connect?: EventAttachmentWhereUniqueInput | EventAttachmentWhereUniqueInput[]
  }

  export type EventAttachmentUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventAttachmentCreateWithoutEventInput, EventAttachmentUncheckedCreateWithoutEventInput> | EventAttachmentCreateWithoutEventInput[] | EventAttachmentUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventAttachmentCreateOrConnectWithoutEventInput | EventAttachmentCreateOrConnectWithoutEventInput[]
    upsert?: EventAttachmentUpsertWithWhereUniqueWithoutEventInput | EventAttachmentUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventAttachmentCreateManyEventInputEnvelope
    set?: EventAttachmentWhereUniqueInput | EventAttachmentWhereUniqueInput[]
    disconnect?: EventAttachmentWhereUniqueInput | EventAttachmentWhereUniqueInput[]
    delete?: EventAttachmentWhereUniqueInput | EventAttachmentWhereUniqueInput[]
    connect?: EventAttachmentWhereUniqueInput | EventAttachmentWhereUniqueInput[]
    update?: EventAttachmentUpdateWithWhereUniqueWithoutEventInput | EventAttachmentUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventAttachmentUpdateManyWithWhereWithoutEventInput | EventAttachmentUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventAttachmentScalarWhereInput | EventAttachmentScalarWhereInput[]
  }

  export type EventAttachmentUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventAttachmentCreateWithoutEventInput, EventAttachmentUncheckedCreateWithoutEventInput> | EventAttachmentCreateWithoutEventInput[] | EventAttachmentUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventAttachmentCreateOrConnectWithoutEventInput | EventAttachmentCreateOrConnectWithoutEventInput[]
    upsert?: EventAttachmentUpsertWithWhereUniqueWithoutEventInput | EventAttachmentUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventAttachmentCreateManyEventInputEnvelope
    set?: EventAttachmentWhereUniqueInput | EventAttachmentWhereUniqueInput[]
    disconnect?: EventAttachmentWhereUniqueInput | EventAttachmentWhereUniqueInput[]
    delete?: EventAttachmentWhereUniqueInput | EventAttachmentWhereUniqueInput[]
    connect?: EventAttachmentWhereUniqueInput | EventAttachmentWhereUniqueInput[]
    update?: EventAttachmentUpdateWithWhereUniqueWithoutEventInput | EventAttachmentUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventAttachmentUpdateManyWithWhereWithoutEventInput | EventAttachmentUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventAttachmentScalarWhereInput | EventAttachmentScalarWhereInput[]
  }

  export type CalendarEventCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<CalendarEventCreateWithoutAttachmentsInput, CalendarEventUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: CalendarEventCreateOrConnectWithoutAttachmentsInput
    connect?: CalendarEventWhereUniqueInput
  }

  export type CalendarEventUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: XOR<CalendarEventCreateWithoutAttachmentsInput, CalendarEventUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: CalendarEventCreateOrConnectWithoutAttachmentsInput
    upsert?: CalendarEventUpsertWithoutAttachmentsInput
    connect?: CalendarEventWhereUniqueInput
    update?: XOR<XOR<CalendarEventUpdateToOneWithWhereWithoutAttachmentsInput, CalendarEventUpdateWithoutAttachmentsInput>, CalendarEventUncheckedUpdateWithoutAttachmentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EventAttachmentCreateWithoutEventInput = {
    id?: string
    name: string
    type: string
    url: string
    size: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventAttachmentUncheckedCreateWithoutEventInput = {
    id?: string
    name: string
    type: string
    url: string
    size: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventAttachmentCreateOrConnectWithoutEventInput = {
    where: EventAttachmentWhereUniqueInput
    create: XOR<EventAttachmentCreateWithoutEventInput, EventAttachmentUncheckedCreateWithoutEventInput>
  }

  export type EventAttachmentCreateManyEventInputEnvelope = {
    data: EventAttachmentCreateManyEventInput | EventAttachmentCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type EventAttachmentUpsertWithWhereUniqueWithoutEventInput = {
    where: EventAttachmentWhereUniqueInput
    update: XOR<EventAttachmentUpdateWithoutEventInput, EventAttachmentUncheckedUpdateWithoutEventInput>
    create: XOR<EventAttachmentCreateWithoutEventInput, EventAttachmentUncheckedCreateWithoutEventInput>
  }

  export type EventAttachmentUpdateWithWhereUniqueWithoutEventInput = {
    where: EventAttachmentWhereUniqueInput
    data: XOR<EventAttachmentUpdateWithoutEventInput, EventAttachmentUncheckedUpdateWithoutEventInput>
  }

  export type EventAttachmentUpdateManyWithWhereWithoutEventInput = {
    where: EventAttachmentScalarWhereInput
    data: XOR<EventAttachmentUpdateManyMutationInput, EventAttachmentUncheckedUpdateManyWithoutEventInput>
  }

  export type EventAttachmentScalarWhereInput = {
    AND?: EventAttachmentScalarWhereInput | EventAttachmentScalarWhereInput[]
    OR?: EventAttachmentScalarWhereInput[]
    NOT?: EventAttachmentScalarWhereInput | EventAttachmentScalarWhereInput[]
    id?: StringFilter<"EventAttachment"> | string
    eventId?: StringFilter<"EventAttachment"> | string
    name?: StringFilter<"EventAttachment"> | string
    type?: StringFilter<"EventAttachment"> | string
    url?: StringFilter<"EventAttachment"> | string
    size?: IntFilter<"EventAttachment"> | number
    createdAt?: DateTimeFilter<"EventAttachment"> | Date | string
    updatedAt?: DateTimeFilter<"EventAttachment"> | Date | string
  }

  export type CalendarEventCreateWithoutAttachmentsInput = {
    id?: string
    userId: string
    title: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    allDay?: boolean
    location?: string | null
    color?: string | null
    isRecurring?: boolean
    recurrenceRule?: string | null
    reminderBefore?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CalendarEventUncheckedCreateWithoutAttachmentsInput = {
    id?: string
    userId: string
    title: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    allDay?: boolean
    location?: string | null
    color?: string | null
    isRecurring?: boolean
    recurrenceRule?: string | null
    reminderBefore?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CalendarEventCreateOrConnectWithoutAttachmentsInput = {
    where: CalendarEventWhereUniqueInput
    create: XOR<CalendarEventCreateWithoutAttachmentsInput, CalendarEventUncheckedCreateWithoutAttachmentsInput>
  }

  export type CalendarEventUpsertWithoutAttachmentsInput = {
    update: XOR<CalendarEventUpdateWithoutAttachmentsInput, CalendarEventUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<CalendarEventCreateWithoutAttachmentsInput, CalendarEventUncheckedCreateWithoutAttachmentsInput>
    where?: CalendarEventWhereInput
  }

  export type CalendarEventUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: CalendarEventWhereInput
    data: XOR<CalendarEventUpdateWithoutAttachmentsInput, CalendarEventUncheckedUpdateWithoutAttachmentsInput>
  }

  export type CalendarEventUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    allDay?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrenceRule?: NullableStringFieldUpdateOperationsInput | string | null
    reminderBefore?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalendarEventUncheckedUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    allDay?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrenceRule?: NullableStringFieldUpdateOperationsInput | string | null
    reminderBefore?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventAttachmentCreateManyEventInput = {
    id?: string
    name: string
    type: string
    url: string
    size: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventAttachmentUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventAttachmentUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventAttachmentUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}