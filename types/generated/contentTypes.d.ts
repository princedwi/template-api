import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiActivityLogActivityLog extends Schema.CollectionType {
  collectionName: 'activity_logs';
  info: {
    singularName: 'activity-log';
    pluralName: 'activity-logs';
    displayName: 'Activity_Log';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ActivityLogID: Attribute.UID;
    ProjectID: Attribute.Relation<
      'api::activity-log.activity-log',
      'oneToOne',
      'api::project-info.project-info'
    >;
    ModifiedDate: Attribute.DateTime;
    Section: Attribute.String;
    Entity: Attribute.String;
    OldVal: Attribute.String;
    NewVal: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::activity-log.activity-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::activity-log.activity-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConceptReviewConceptReview extends Schema.CollectionType {
  collectionName: 'concept_reviews';
  info: {
    singularName: 'concept-review';
    pluralName: 'concept-reviews';
    displayName: 'Concept_Review';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Modelling_Objective: Attribute.String;
    Link_to_Hydrology: Attribute.String;
    Main_Data_Gaps: Attribute.String;
    Main_Assumption_Risk: Attribute.String;
    Data_Management_Strategy: Attribute.String;
    Modelling_Task: Attribute.Relation<
      'api::concept-review.concept-review',
      'oneToOne',
      'api::master-modelling-task.master-modelling-task'
    >;
    Events_To_Be_Modelled: Attribute.String;
    Climate_Change_Approach: Attribute.String;
    ModellingTaskOther: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::concept-review.concept-review',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::concept-review.concept-review',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDataTableDataTable extends Schema.CollectionType {
  collectionName: 'data_tables';
  info: {
    singularName: 'data-table';
    pluralName: 'data-tables';
    displayName: 'DataTable';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    DataID: Attribute.UID;
    ProjectID: Attribute.Relation<
      'api::data-table.data-table',
      'oneToOne',
      'api::project-info.project-info'
    >;
    Data: Attribute.String;
    DescriptionUse: Attribute.String;
    Location: Attribute.String;
    DataAdded: Attribute.String;
    Source: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::data-table.data-table',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::data-table.data-table',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMasterModelMappingMasterModelMapping
  extends Schema.CollectionType {
  collectionName: 'master_model_mappings';
  info: {
    singularName: 'master-model-mapping';
    pluralName: 'master-model-mappings';
    displayName: 'Master_Model_Mapping';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    MasterModelMappingID: Attribute.UID;
    MasterModelTypeID: Attribute.Relation<
      'api::master-model-mapping.master-model-mapping',
      'oneToOne',
      'api::master-model-type.master-model-type'
    >;
    MasterModelSoftwareID: Attribute.Relation<
      'api::master-model-mapping.master-model-mapping',
      'oneToOne',
      'api::master-model-software.master-model-software'
    >;
    MasterModelSystemsID: Attribute.Relation<
      'api::master-model-mapping.master-model-mapping',
      'oneToOne',
      'api::master-model-system.master-model-system'
    >;
    MasterModelSpecID: Attribute.Relation<
      'api::master-model-mapping.master-model-mapping',
      'oneToOne',
      'api::master-model-spec.master-model-spec'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::master-model-mapping.master-model-mapping',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::master-model-mapping.master-model-mapping',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMasterModelSoftwareMasterModelSoftware
  extends Schema.CollectionType {
  collectionName: 'master_model_softwares';
  info: {
    singularName: 'master-model-software';
    pluralName: 'master-model-softwares';
    displayName: 'Master_ModelSoftware';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Master_ModelSoftware_ID: Attribute.Integer &
      Attribute.Required &
      Attribute.Unique;
    Field: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::master-model-software.master-model-software',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::master-model-software.master-model-software',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMasterModelSpecMasterModelSpec
  extends Schema.CollectionType {
  collectionName: 'master_model_specs';
  info: {
    singularName: 'master-model-spec';
    pluralName: 'master-model-specs';
    displayName: 'Master_Model_Spec ';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    MasterModelSpecID: Attribute.UID;
    ModelSpec: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::master-model-spec.master-model-spec',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::master-model-spec.master-model-spec',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMasterModelSystemMasterModelSystem
  extends Schema.CollectionType {
  collectionName: 'master_model_systems';
  info: {
    singularName: 'master-model-system';
    pluralName: 'master-model-systems';
    displayName: 'Master_ModelSystem';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Master_ModelSystem_ID: Attribute.Integer &
      Attribute.Required &
      Attribute.Unique;
    Field: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::master-model-system.master-model-system',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::master-model-system.master-model-system',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMasterModelTypeMasterModelType
  extends Schema.CollectionType {
  collectionName: 'master_model_types';
  info: {
    singularName: 'master-model-type';
    pluralName: 'master-model-types';
    displayName: 'Master_ModelType';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Master_ModelType_ID: Attribute.Integer &
      Attribute.Required &
      Attribute.Unique;
    Field: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::master-model-type.master-model-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::master-model-type.master-model-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMasterModellingTaskMasterModellingTask
  extends Schema.CollectionType {
  collectionName: 'master_modelling_tasks';
  info: {
    singularName: 'master-modelling-task';
    pluralName: 'master-modelling-tasks';
    displayName: 'Master_Modelling_Task';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    MasterModellingTask_ID: Attribute.Integer &
      Attribute.Required &
      Attribute.Unique;
    Field: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::master-modelling-task.master-modelling-task',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::master-modelling-task.master-modelling-task',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMasterOutputMasterOutput extends Schema.CollectionType {
  collectionName: 'master_outputs';
  info: {
    singularName: 'master-output';
    pluralName: 'master-outputs';
    displayName: 'MasterOutput';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    MasterOutput_ID: Attribute.Integer;
    Field: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::master-output.master-output',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::master-output.master-output',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMasterSpecQueryMasterSpecQuery
  extends Schema.CollectionType {
  collectionName: 'master_spec_queries';
  info: {
    singularName: 'master-spec-query';
    pluralName: 'master-spec-queries';
    displayName: 'Master_Spec_Query';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    SpecQueryID: Attribute.UID;
    MasterModelSpecID: Attribute.Relation<
      'api::master-spec-query.master-spec-query',
      'oneToOne',
      'api::master-model-spec.master-model-spec'
    >;
    Query: Attribute.String;
    isActive: Attribute.Boolean;
    Category1: Attribute.String;
    Category2: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::master-spec-query.master-spec-query',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::master-spec-query.master-spec-query',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMasterTypeStudyMasterTypeStudy
  extends Schema.CollectionType {
  collectionName: 'master_type_studies';
  info: {
    singularName: 'master-type-study';
    pluralName: 'master-type-studies';
    displayName: 'Master_Type_Study';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    MasterTypeStudy_Id: Attribute.Integer &
      Attribute.Required &
      Attribute.Unique;
    Field: Attribute.String & Attribute.Required;
    project_info: Attribute.Relation<
      'api::master-type-study.master-type-study',
      'oneToOne',
      'api::project-info.project-info'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::master-type-study.master-type-study',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::master-type-study.master-type-study',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiModelApprochModelApproch extends Schema.CollectionType {
  collectionName: 'model_approches';
  info: {
    singularName: 'model-approch';
    pluralName: 'model-approches';
    displayName: 'Model_Approch';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ProductID: Attribute.Relation<
      'api::model-approch.model-approch',
      'oneToOne',
      'api::project-info.project-info'
    >;
    ModelApproachID: Attribute.UID & Attribute.Required;
    ModelType_ID: Attribute.Relation<
      'api::model-approch.model-approch',
      'oneToOne',
      'api::master-model-type.master-model-type'
    >;
    ModelSoftware_ID: Attribute.Relation<
      'api::model-approch.model-approch',
      'oneToOne',
      'api::master-model-software.master-model-software'
    >;
    ModelSystem_ID: Attribute.Relation<
      'api::model-approch.model-approch',
      'oneToOne',
      'api::master-model-system.master-model-system'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::model-approch.model-approch',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::model-approch.model-approch',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOutputDetailsTableOutputDetailsTable
  extends Schema.CollectionType {
  collectionName: 'output_details_tables';
  info: {
    singularName: 'output-details-table';
    pluralName: 'output-details-tables';
    displayName: 'OutputDetailsTable';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    OutputDetailsID: Attribute.UID;
    OutputID: Attribute.Relation<
      'api::output-details-table.output-details-table',
      'oneToOne',
      'api::output-table.output-table'
    >;
    OutputName: Attribute.Relation<
      'api::output-details-table.output-details-table',
      'oneToOne',
      'api::master-output.master-output'
    >;
    Recipient: Attribute.String;
    Notes: Attribute.String;
    ClientDeliverable: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::output-details-table.output-details-table',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::output-details-table.output-details-table',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOutputTableOutputTable extends Schema.CollectionType {
  collectionName: 'output_tables';
  info: {
    singularName: 'output-table';
    pluralName: 'output-tables';
    displayName: 'OutputTable';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    OutputID: Attribute.UID;
    ProjectID: Attribute.Relation<
      'api::output-table.output-table',
      'oneToOne',
      'api::project-info.project-info'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::output-table.output-table',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::output-table.output-table',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectInfoProjectInfo extends Schema.CollectionType {
  collectionName: 'project_infos';
  info: {
    singularName: 'project-info';
    pluralName: 'project-infos';
    displayName: 'Project_Info';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ProjectName: Attribute.String & Attribute.Required;
    ProjectCode: Attribute.String;
    ProjectManager: Attribute.String;
    ProjectVerifier: Attribute.String;
    ClientScope: Attribute.String;
    Budget: Attribute.String;
    Originator: Attribute.String;
    Lead: Attribute.String;
    StudyOther: Attribute.String;
    master_type_study: Attribute.Relation<
      'api::project-info.project-info',
      'oneToOne',
      'api::master-type-study.master-type-study'
    >;
    Advisor: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-info.project-info',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-info.project-info',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectSpecQueryResponseProjectSpecQueryResponse
  extends Schema.CollectionType {
  collectionName: 'project_spec_query_responses';
  info: {
    singularName: 'project-spec-query-response';
    pluralName: 'project-spec-query-responses';
    displayName: 'Project_Spec_Query_Response ';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ProjectSpecQueryResID: Attribute.UID;
    MasterSpecQueryID: Attribute.Relation<
      'api::project-spec-query-response.project-spec-query-response',
      'oneToOne',
      'api::master-spec-query.master-spec-query'
    >;
    ProjectID: Attribute.Relation<
      'api::project-spec-query-response.project-spec-query-response',
      'oneToOne',
      'api::project-info.project-info'
    >;
    Response: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-spec-query-response.project-spec-query-response',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-spec-query-response.project-spec-query-response',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::activity-log.activity-log': ApiActivityLogActivityLog;
      'api::concept-review.concept-review': ApiConceptReviewConceptReview;
      'api::data-table.data-table': ApiDataTableDataTable;
      'api::master-model-mapping.master-model-mapping': ApiMasterModelMappingMasterModelMapping;
      'api::master-model-software.master-model-software': ApiMasterModelSoftwareMasterModelSoftware;
      'api::master-model-spec.master-model-spec': ApiMasterModelSpecMasterModelSpec;
      'api::master-model-system.master-model-system': ApiMasterModelSystemMasterModelSystem;
      'api::master-model-type.master-model-type': ApiMasterModelTypeMasterModelType;
      'api::master-modelling-task.master-modelling-task': ApiMasterModellingTaskMasterModellingTask;
      'api::master-output.master-output': ApiMasterOutputMasterOutput;
      'api::master-spec-query.master-spec-query': ApiMasterSpecQueryMasterSpecQuery;
      'api::master-type-study.master-type-study': ApiMasterTypeStudyMasterTypeStudy;
      'api::model-approch.model-approch': ApiModelApprochModelApproch;
      'api::output-details-table.output-details-table': ApiOutputDetailsTableOutputDetailsTable;
      'api::output-table.output-table': ApiOutputTableOutputTable;
      'api::project-info.project-info': ApiProjectInfoProjectInfo;
      'api::project-spec-query-response.project-spec-query-response': ApiProjectSpecQueryResponseProjectSpecQueryResponse;
    }
  }
}
