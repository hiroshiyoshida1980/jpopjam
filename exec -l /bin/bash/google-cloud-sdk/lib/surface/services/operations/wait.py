# -*- coding: utf-8 -*- #
# Copyright 2017 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""service-management operations wait command."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from googlecloudsdk.api_lib.services import services_util
from googlecloudsdk.api_lib.services import serviceusage
from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.services import arg_parsers
from googlecloudsdk.command_lib.services import common_flags


@base.ReleaseTracks(base.ReleaseTrack.ALPHA)
class WaitAlpha(base.Command):
  """Waits for an operation to complete for a given operation name.

     This command will block until an operation has been marked as complete.

     ## EXAMPLES
     To wait on an operation named `operations/abc`
     to complete, run:

       $ {command} operations/abc
  """

  @staticmethod
  def Args(parser):
    """Args is called by calliope to gather arguments for this command.

    Args:
      parser: An argparse parser that you can use to add arguments that go
          on the command line after this command. Positional arguments are
          allowed.
    """
    common_flags.operation_flag(suffix='on which to wait').AddToParser(parser)

  def Run(self, args):
    """Run 'services operations wait'.

    Args:
      args: argparse.Namespace, The arguments that this command was invoked
          with.

    Returns:
      If successful, the response from the operations.Get API call.
    """
    op = serviceusage.WaitOperation(args.operation)
    services_util.PrintOperation(op)


@base.ReleaseTracks(base.ReleaseTrack.BETA, base.ReleaseTrack.GA)
class Wait(base.Command):
  """Waits for an operation to complete.

     This command will block until an operation has been marked as complete.

     Note that the `operations/` prefix of the operation name is optional
     and may be omitted.

     ## EXAMPLES
     To wait on an operation named `operations/serviceConfigs.my-service.1`
     to complete, run:

       $ {command} serviceConfigs.my-service.1
  """

  @staticmethod
  def Args(parser):
    """Args is called by calliope to gather arguments for this command.

    Args:
      parser: An argparse parser that you can use to add arguments that go
          on the command line after this command. Positional arguments are
          allowed.
    """
    common_flags.operation_flag(suffix='on which to wait').AddToParser(parser)

  def Run(self, args):
    """Run 'service-management operations wait'.

    Args:
      args: argparse.Namespace, The arguments that this command was invoked
          with.

    Returns:
      If successful, the response from the operations.Get API call.
    """
    messages = services_util.GetMessagesModule()
    client = services_util.GetClientInstance()

    operation_id = arg_parsers.GetOperationIdFromArg(args.operation)

    request = messages.ServicemanagementOperationsGetRequest(
        operationsId=operation_id,)

    operation = client.operations.Get(request)

    return services_util.ProcessOperationResult(operation, is_async=False)
